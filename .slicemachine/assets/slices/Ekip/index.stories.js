import MyComponent from '../../../../slices/Ekip';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/Ekip'
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
      mock: {"variation":"default","name":"Default","slice_type":"ekip","items":[],"primary":{"title":[{"type":"heading1","text":"Grow enterprise schemas","spans":[]}],"description":[{"type":"paragraph","text":"Tempor officia ut velit nisi eu cillum exercitation irure in ad. Cillum ipsum officia et ex deserunt tempor dolor voluptate sint est. Nulla ullamco ad magna elit reprehenderit sint nulla ut voluptate exercitation aliqua dolor.","spans":[]}]},"id":"_Default"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = 'Default'
