const authUrl = "https://url.to.auth.system.com/invitation";
const invitationStatusSuccess = [200, 201];

const checkBody = (body) => {
	//some checks
	return true; 
}

exports.inviteUser = async function(req, res) {
	let { body: invitationBody, params: { shopId } } = req;

	if (!shopId || checkBody(invitationBody)) {
		return res.status(400).send({ message: 'Shop id or invitationBody wrong' });
	}

	try {
		const invitationResponse = await superagent
			.post(authUrl)
			.send(invitationBody);

		if (!invitationStatusSuccess.includes(invitationResponse.status)) {
			return res.json(invitationResponse);
		}

		if (invitationResponse.status === 200) {
			return res.status(400).json({
				error: true,
				message: 'User already invited to this shop'
			});
		}

		const { body: { authId, invitationId }}  = invitationResponse;

		const createdUser = await User.findOneAndUpdate({ authId },
			{
				authId,
				email: invitationBody.email
			},
			{
				upsert: true,
				new: true
			}, 
		);

		const shop = await Shop.findById(shopId);
		if (!shop) {
			return res.status(500).send({ message: 'No shop found' });
		}

		if (shop.invitations.includes(invitationId)) { // sounds strange adding invitation when it already exists, but my task is refactor, not business logic changes :)
			shop.invitations.push(invitationId);
		}

		if (!shop.users.includes(createdUser._id)) { //users array should be type of ObjectId, not just strings
			shop.users.push(createdUser);
		}
		shop.save();
	}
	catch (error) {
		return res.status(500).send(error.message || { message: 'Something went wrong' });
	}
};