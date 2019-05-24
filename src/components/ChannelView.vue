<template>
  <v-container class="chat" fill-height fluid>
    <v-layout column style="height: 100vh">

      <v-flex xs11 id="chat-box" style="overflow: auto">
        <v-layout column>
          <v-flex v-for="(item, key) in messageList">
            <v-layout row class="row-chat" :class="{'row-chat-successiv': isSuccessiv(key)}">
              <div class="my-avatar" :style="{visibility: printAvatar(key) && item.author.user_id != myName ? 'visible' : 'hidden'}">
                <img :src="item.author.profile_picture" height="40" width="40" style="border-radius: 4px;"/>
              </div>
              <div class="chat-buble" :class="{personnal: item.author.user_id == myName}">
                <div style="padding-top: 4px;">
                  {{ item.text }}
                </div>
              </div>
            </v-layout>
          </v-flex>

          <v-flex v-for="(user, key) in typingUsers" v-if="user.user_id !== myName">
            <v-layout row class="row-chat">
              <div class="my-avatar">
                <img :src="user.profile_picture" height="40" width="40" style="border-radius: 4px;"/>
              </div>
              <div class="chat-buble">
                <div style="padding-top: 4px;">
                  ...
                </div>
              </div>
            </v-layout>
          </v-flex>

        </v-layout>
      </v-flex>

      <v-flex xs1 class="chat-text">
        <v-layout row fill-height align-center>
          <v-flex xs1/>
          <v-flex xs9 style="position: relative">
            <div :hidden="emojiPickerHidden" class="emoji-picker-container">
              <VEmojiPicker :pack="emojisNative" :emojisByRow="8" labelSearch @select="onSelectEmoji" v-click-outside="vcoConfig"/>
            </div>
            <v-layout row class="my-text-input-box">
              <input type="text" class="my-text-input" v-model="messageTyping" @keyup="keyPressed">
              <v-icon id="emojis" style="cursor: pointer" color="rgb(34,132,255)" @click="emojiPickerHidden = false">insert_emoticon</v-icon>
            </v-layout>
          </v-flex>
          <v-flex xs 2 justify-center>
            <v-layout row justify-center>
              <v-icon style="cursor: pointer" color="rgb(34,132,255)" @click="sendMessage">send</v-icon>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>



<script>
import VEmojiPicker from "v-emoji-picker";
import packData from "v-emoji-picker/data/emojis.json";

export default {
  components: {
    VEmojiPicker
  },
  props: {
    myName: {type: String, required: true},
    messageList: {type: Array, required: true},
    typingUsers: {type: Array, required: true}
  },
  data () {
    return {
      vcoConfig: {
        handler: this.onClickOutside,
        middleware: this.middlewareClickOutside,
        events: ['dblclick', 'click']
      },
      messageTyping: '',
      emojiPickerHidden: true,
      typingTimer: null
    }
  },
  mounted() {
    // scroll to last message
    setTimeout(() => {
      this.scrollToBottom()
    }, 100);
  },
  computed: {
    emojisNative: () => packData
  },
  methods: {
    isSuccessiv(key) {
      if (key == this.messageList.length - 1)
        return false
      return this.messageList[key].author.user_id == this.messageList[key + 1].author.user_id
    },
    printAvatar(key) {
      if (key == this.messageList.length - 1)
        return true
      return this.messageList[key].author.user_id != this.messageList[key + 1].author.user_id
    },
    scrollToBottom() {
      var objDiv =document.getElementById("chat-box")
      objDiv.scrollTop = objDiv.scrollHeight
    },
    onSelectEmoji(dataEmoji) {
      this.messageTyping += dataEmoji.emoji
    },
    onClickOutside (event) {
      this.emojiPickerHidden = true
    },
    middlewareClickOutside(event, el) {
      return event.target.id !== 'emojis'
    },
    sendMessage() {
      this.$emit('send', this.messageTyping)
      this.messageTyping = ''
    },
    keyPressed(e) {
      if (e.key === "Enter") {
        this.sendMessage()
        clearTimeout(this.typingTimer)
        this.typingTimer = null
        this.$emit('endTyping')
      } else {
        if (this.typingTimer == null) {
          this.$emit('startTyping')
        }
        clearTimeout(this.typingTimer)
        this.typingTimer = setTimeout(() => {
          this.typingTimer = null
          this.$emit('endTyping')
        }, 2000) // 2 seconds
      }
    }
  }
}
</script>











<style scoped>
.chat {
  padding: 0 !important;
  margin: 0 !important;
}
#chat-box {
  background-color: white;
}
.row-chat {
  padding: 4px 0;
}
.row-chat-successiv {
  padding-bottom: 0 !important;
}
.my-avatar {
  align-self: flex-end;
  padding: 0 0 0 12px;
}
.chat-buble {
  max-width: 60%;
  border-radius: 16px;
  margin: 0 12px;
  padding: 8px 12px;
  background-color: rgb(239,239,239);
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 18px;
}
.personnal {
  margin-left: auto;
  background-color: rgb(34,132,255) !important;
  color: white !important;
}


.emoji-picker-container {
  position: absolute;
  bottom: 54px; right: 0px;
}

.my-text-input-box {
  background-color: rgb(240,240,240);
  padding: 12px;
  border-radius: 50px;
}
.my-text-input {
  margin-left: 6px;
  flex: 1;
  font-size: 18px;
}
.my-text-input:focus{
  outline: none;
}
</style>

<style>
.v-list__tile--avatar {
  height: 50px !important;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background: rgb(34,132,255);
  border-radius: 4px;
}
</style>
