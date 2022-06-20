<template>
  <VContainer class="albums-page">
    <VTextField
      v-model="searchArtist"
      class="albums-page__search"
      prepend-icon="mdi-account-search-outline"
      placeholder="Search for artist..."
      variant="underlined"
      density="compact"
      clearable
    />
    <VTextField
      v-model="searchAlbum"
      :disabled="!searchArtist"
      class="albums-page__search"
      prepend-icon="mdi-clipboard-text-search-outline"
      placeholder="Search for album..."
      variant="underlined"
      density="compact"
      clearable
    />
    <VDivider/>
    <VRow v-if="loading" class="my-5">
      <VBtn class="mx-auto" elevation="0" loading />
    </VRow>
    <div class="d-flex flex-wrap align-center justify-center" v-else-if="filteredAlbums.length">
          <AlbumComponent v-for="album in albumsToShow" :key="album.collectionId" :album="album" />
    </div>
    <div class="albums-page__message" v-else-if="searchArtist">Can't find anything with this artist.</div>
    <div class="albums-page__message" v-else>Enter artist name to start search.</div>
    <VPagination
      v-if="filteredAlbums.length"
      v-model="page"
      class="albums-page__pagination"
      :length="paginationLength"
    />
    <VSnackbar
      v-model="snackbar"
      :timeout="2000"
    >
      {{ snackbarText }}
      <template v-slot:actions>
        <VBtn
          color="blue"
          variant="text"
          @click="snackbar = false"
        >
          Close
        </VBtn>
      </template>
    </VSnackbar>
  </VContainer>
 
</template>

<script lang='ts'>
import { computed, ComputedRef, defineComponent, ref, Ref, watch } from 'vue';
import { Album } from '../types';
import { getAlbums } from '../services';
import AlbumComponent from './Album.vue';
import debounce from 'lodash/debounce';

export default defineComponent({
  components: {
    AlbumComponent,
  },
  setup() {
    const searchArtist: Ref<string> = ref('');
    const searchAlbum: Ref<string> = ref('');
    const snackbarText: Ref<string> = ref('');
    const page: Ref<number> = ref(0);
    const albums: Ref<Album[]> = ref([]);
    const filteredAlbums: Ref<Album[]> = ref([]);
    const loading: Ref<boolean> = ref(false);
    const snackbar: Ref<boolean> = ref(false);


    const loadAlbums = async (artist: string): Promise<void> => {
      loading.value = true;
      try {
        const { data } = await getAlbums(artist);
        albums.value = data;
        filteredAlbums.value = data;
      } catch(error) {
        snackbar.value = true;
        snackbarText.value = error.message || 'Something went wrong!';
      } finally {
        loading.value = false;
      }
    };

    const filterAlbums = (searchName: string): void => {
      loading.value = true;
      filteredAlbums.value = albums.value.filter((album: Album) => 
        album.collectionName.includes(searchName)
      );
      loading.value = false;
    };

    const resetCurrentPage = () => {
      page.value = 1;
    };

    const albumsToShow: ComputedRef<Album[]> = computed(() => {
      return filteredAlbums.value.slice((page.value - 1) * 10, page.value * 10);
    })

    const paginationLength: ComputedRef<number> = computed(() => {
      return filteredAlbums.value.length ? Math.ceil(filteredAlbums.value.length / 10) : 1;
    })

    watch(searchArtist, debounce(async (value: string): Promise<void> => {
      resetCurrentPage();
      if (!value) {
        searchAlbum.value = '';
        albums.value = [];
        filteredAlbums.value = [];
        return;
      }
      await loadAlbums(value);
    }, 300));

    watch(searchAlbum, debounce((value: string): Promise<void> => {
      resetCurrentPage();
      if (!value) {
        filteredAlbums.value = [...albums.value];
        return;
      }
      filterAlbums(value);
    }, 300));

    return {
      searchArtist,
      searchAlbum,
      albums,
      loading,
      snackbar,
      snackbarText,
      filteredAlbums,
      paginationLength,
      page,
      albumsToShow,
    };
  },
})
</script>

<style lang="scss" scoped>
$card-color: rgb(241, 241, 241);
$primary-color: rgb(255, 174, 0);
$secondary-color: rgb(0, 217, 255);
$white-color: rgb(255, 255, 255);

.albums-page {
  max-width: 1600px;
  padding: 40px;

  &__search {
    max-width: 450px;
    margin-left: auto;
  }

  &__message {
    font-size: 25px;
    font-weight: bold;
    margin: 20px auto;
    color: rgb(167, 166, 166);
    text-align: center;
  }

  &__pagination {
    max-width: 550px;
    padding: 0 20px;
    margin: 30px auto;
  }
}
</style>
