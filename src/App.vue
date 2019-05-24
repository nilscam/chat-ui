<template>
  <v-app>
    <v-content>
      <ChannelController />
    </v-content>
  </v-app>
</template>

<script>
import ChannelController from './components/ChannelController'

export default {
  name: 'App',
  components: {
    ChannelController
  }
}
</script>
