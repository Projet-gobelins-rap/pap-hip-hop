import MyComponent from '../../../../slices/MediaSlice';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/MediaSlice'
}


export const _Default = () => ({
  components: {
    MyComponent,
    SliceZone
  },
  methods: {
    resolve() {
      return MyComponent
    }
  },
  data() {
    return {
      mock: {"variation":"default","name":"Default","slice_type":"media_slice","items":[{"media":{"link_type":"media","url":"https://source.unsplash.com/daily"}},{"media":{"link_type":"media","url":"https://source.unsplash.com/daily"}},{"media":{"link_type":"media","url":"https://source.unsplash.com/daily"}},{"media":{"link_type":"media","url":"https://source.unsplash.com/daily"}}],"primary":{},"id":"_Default"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = 'Default'
