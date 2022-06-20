<template>
  <VCard class="album-block" elevation="2">
	<VImg class="album-block__img" :aspect-ratio="1" width="100" :src="album.artworkUrl100"/>
	<VTooltip location="top">
		<template v-slot:activator="{ props }">
			<div class="album-block__title my-3 text-truncate" v-bind="props">
				{{ album.collectionName }}
			</div>
		</template>
		<span>{{ album.collectionName }}</span>
	</VTooltip>
	<VRow class="pa-3">
		<VBtn
			class="album-block__button"
			:href="album.collectionViewUrl"
			target="_blank" 
			prepend-icon="mdi-open-in-new"
		>
		Open
		</VBtn>
	</VRow>
</VCard>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue';
import { Album } from '../types';

export default defineComponent({
	props: {
		album: {
			type: Object as PropType<Album>,
			required: true,
		}
	},
	setup() {
		return {};
	},
})
</script>

<style lang="scss" scoped>
$card-color: rgba(241, 241, 241, 0.438);
$secondary-color: #d60017;
$white-color: rgb(255, 255, 255);

.album-block {
	margin: 20px;
	width: 250px;
	height: 100%;
	padding: 10px;
	background-color: $card-color;

	&__img {
		margin: 0 auto;
	}
	&__button {
		margin-left: auto;
		background-color: $secondary-color;
		color: $white-color;
	}
	&__title {
		max-width: 90%;
	}
}
</style>
