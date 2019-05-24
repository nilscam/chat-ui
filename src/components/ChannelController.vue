<template>
  <ChannelView
    :messageList="messageList"
    :typingUsers="typingUsers"
    @send="sendMessage"
    :myName="me.user_id"
    @startTyping="startTyping"
    @endTyping="endTyping"
  />
</template>

<script>
import ChannelView from './ChannelView'
import fakedata from '../script/utils.js'

export default {
  components: {
    ChannelView
  },
  data() {
    return {
      me: {
        user_id: 'Nils',
        profile_picture: 'https://randomuser.me/api/portraits/men/26.jpg'
      },
      typingUsers: [],
      messageList: []
    }
  },
  mounted() {
    this.messageList = fakedata.messages
  },
  methods: {
    sendMessage(text) {
      console.log('Message Send : ', text);
      let message = { author: this.me, text }
      this.messageList.push(message)
    },
    startTyping() {
      console.log('User is typing');
    },
    endTyping() {
      console.log('User stopped typing');
    }

  }
}
</script>
