import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Albums from '../Albums.vue';
import Album from '../Album.vue';
import { Album } from '@/types';

describe('HelloWorld', () => {
  it('Page renders properly', () => {
    const wrapper = mount(Albums)
    expect(wrapper.text()).toContain('Search for artist...')
  });

  it('Album component renders properly', () => {
    const testAlbum: Album = {
      collectionName: 'Test Name',
      collectionType: 'album',
      artworkUrl100: 'some url',
      collectionViewUrl: 'url',
      collectionId: 11111
    };
    const wrapper = mount(Album, { props: { album: testAlbum } })
    expect(wrapper.text()).exist.and.toContain('Test Name')
  })
})
