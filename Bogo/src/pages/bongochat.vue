<template>
    <f7-page>
        <f7-navbar no-shadow>
            <f7-nav-left >
                <f7-link v-on:click="goBack" style="width: 56px;height: 56px;padding-left: 20px;padding-right: 20px;">
                    <img  src="static/images/gray_back.png" style="width: 12px;height: 22px;"/>
                </f7-link>
            </f7-nav-left>
            <f7-nav-title style="font-weight:lighter;">Bongo</f7-nav-title>
            <f7-nav-right>
                <img src="static/images/head_icon.png" style="width: 80px;height: 56px"/>
            </f7-nav-right>
        </f7-navbar>
        <f7-messagebar style="padding-left: 20px;"
                :placeholder="placeholder"
                 ref="messagebar"
                :attachments-visible="attachmentsVisible"
                :sheet-visible="sheetVisible"
                :value="messageText"
                @input="messageText = $event.target.value"
        >
            <f7-link style="display: none"
                    icon-ios="f7:camera_fill"
                    icon-md="material:camera_alt"
                    slot="inner-start"
                    @click="sheetVisible = !sheetVisible"
            ></f7-link>
            <f7-link
                    icon-ios="f7:arrow_up_fill"
                    icon-md="material:send"
                    slot="inner-end"
                    @click="sendMessage"
            ></f7-link>
            <f7-messagebar-attachments>
                <f7-messagebar-attachment
                        v-for="(image, index) in attachments"
                        :key="index"
                        :image="image"
                        @attachment:delete="deleteAttachment(image)"
                ></f7-messagebar-attachment>
            </f7-messagebar-attachments>
            <f7-messagebar-sheet>
                <f7-messagebar-sheet-image
                        v-for="(image, index) in images"
                        :key="index"
                        :image="image"
                        :checked="attachments.indexOf(image) >= 0"
                        @change="handleAttachment"
                ></f7-messagebar-sheet-image>
            </f7-messagebar-sheet>
        </f7-messagebar>



        <f7-messages ref="messages">
            <f7-messages-title></f7-messages-title>
            <f7-message
                    v-for="(message, index) in messagesData"
                    :key="index"
                    :type="message.type"
                    :image="message.image"
                    :name="message.name"
                    :avatar="message.avatar"
                    :first="isFirstMessage(message, index)"
                    :last="isLastMessage(message, index)"
                    :tail="isTailMessage(message, index)"
            >
                <span slot="text" v-if="message.text" v-html="message.text"></span>
            </f7-message>
            <f7-message v-if="typingMessage"
                        type="received"
                        :typing="true"
                        :first="true"
                        :last="true"
                        :tail="true"
                        :header="`${typingMessage.name} is typing`"
                        :avatar="typingMessage.avatar"
            ></f7-message>
        </f7-messages>
    </f7-page>
</template>

<script>
    import { f7Navbar, f7Page, f7Messages, f7MessagesTitle, f7Message, f7Messagebar, f7Link, f7MessagebarAttachments, f7MessagebarAttachment, f7MessagebarSheet, f7MessagebarSheetImage } from 'framework7-vue';
    export default {
        components: {
            f7Navbar,
            f7Page,
            f7Messages,
            f7MessagesTitle,
            f7Message,
            f7Messagebar,
            f7MessagebarAttachments,
            f7MessagebarAttachment,
            f7MessagebarSheet,
            f7MessagebarSheetImage,
            f7Link,
        },
        data() {
            return {
                attachments: [],
                sheetVisible: false,
                typingMessage: null,
                messageText: '',
                headImag:this.$store.state.userInfo.headImg,
                messagesData: [
                    {
                        type: 'sent',
                        text: 'Hi, Kate',
                    },
                    {
                        type: 'sent',
                        text: 'How are you?',
                    },
                    {
                        name: 'Kate',
                        type: 'sent',
                        text: 'Hi, I am good!',
                        avatar: 'http://lorempixel.com/100/100/people/9',
                    },
                    {
                        name: 'Blue Ninja',
                        type: 'sent',
                        text: 'Hi there, I am also fine, thanks! And how are you?',
                        avatar: 'http://lorempixel.com/100/100/people/7',
                    },
                    {
                        type: 'sent',
                        text: 'Hey, Blue Ninja! Glad to see you ;)',
                    },
                    {
                        type: 'sent',
                        text: 'Hey, look, cutest kitten ever!',
                    },
                    {
                        type: 'sent',
                        image: 'http://lorempixel.com/200/260/cats/4/',
                    },
                    {
                        name: 'Kate',
                        type: 'sent',
                        text: 'Nice!',
                        avatar: 'http://lorempixel.com/100/100/people/9',
                    },
                    {
                        name: 'Kate',
                        type: 'sent',
                        text: 'Like it very much!',
                        avatar: 'http://lorempixel.com/100/100/people/9',
                    },
                    {
                        name: 'Blue Ninja',
                        type: 'sent',
                        text: 'Awesome!',
                        avatar: 'http://lorempixel.com/100/100/people/7',
                    },
                ],
                images: [
                    'http://lorempixel.com/300/300/cats/1/',
                    'http://lorempixel.com/200/300/cats/2/',
                    'http://lorempixel.com/400/300/cats/3/',
                    'http://lorempixel.com/300/150/cats/4/',
                    'http://lorempixel.com/150/300/cats/5/',
                    'http://lorempixel.com/300/300/cats/6/',
                    'http://lorempixel.com/300/300/cats/7/',
                    'http://lorempixel.com/200/300/cats/8/',
                    'http://lorempixel.com/400/300/cats/9/',
                    'http://lorempixel.com/300/150/cats/10/',
                ],
                people: [
                    {
                        name: 'Bongo',
                        avatar: 'http://lorempixel.com/100/100/people/9',
                    },
                ],
                answers: [
                    'Yes!',
                    'Hello',
                ],
                responseInProgress: false,
            };
        },
        computed: {
            attachmentsVisible() {
                const self = this;
                return self.attachments.length > 0;
            },
            placeholder() {
                const self = this;
                return self.attachments.length > 0 ? 'Add comment or Send' : 'Message';
            },
        },
        mounted() {
            const self = this;
            self.$f7ready(() => {
                self.messagebar = self.$refs.messagebar.f7Messagebar;
                self.messages = self.$refs.messages.f7Messages;
            });
            let chatToBongoList=this.$dataManager.getAllChatToBongo()
            self.messagesData=chatToBongoList==null?[]:chatToBongoList
            self.messagesData.push({
                name: 'Bongo',
                type: 'received',
                text: 'Hi!',
                avatar: './static/images/bongo_logo.png',
            })
            console.log(self.messagesData)
        },
        methods: {

            goBack(){
                console.log("go back")
                this.$f7router.back()
            },

            isFirstMessage(message, index) {
                return false;
                const self = this;
                const previousMessage = self.messagesData[index - 1];
                if (message.isTitle) return false;
                if (!previousMessage || previousMessage.type !== message.type || previousMessage.name !== message.name) return true;
                return true;
            },

            isLastMessage(message, index) {
                return true;
                const self = this;
                const nextMessage = self.messagesData[index + 1];
                if (message.isTitle) return false;
                if (!nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name) return true;
                return false;
            },

            isTailMessage(message, index) {
                return true;
                const self = this;
                const nextMessage = self.messagesData[index + 1];
                if (message.isTitle) return false;
                if (!nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name) return true;
                return false;
            },
            deleteAttachment(image) {
                const self = this;
                const index = self.attachments.indexOf(image);
                self.attachments.splice(index, 1)[0]; // eslint-disable-line
            },
            handleAttachment(e) {
                const self = this;
                const index = self.$$(e.target).parents('label.checkbox').index();
                const image = self.images[index];
                if (e.target.checked) {
                    // Add to attachments
                    self.attachments.unshift(image);
                } else {
                    // Remove from attachments
                    self.attachments.splice(self.attachments.indexOf(image), 1);
                }
            },
            sendMessage() {
                const self = this;
                let mineInfo = self.$dataManager.getMyself();
                let myAvater=mineInfo.headPortrait
                const text = self.messageText.replace(/\n/g, '<br>').trim();
                const messagesToSend = [];
                let timestamp=new Date().getTime()
                self.attachments.forEach((attachment) => {
                    messagesToSend.push({
                        image: attachment,
                    });
                });
                if (text.length) {
                    messagesToSend.push({
                        type: 'sent',
                        text: text,
                        name:mineInfo.userName,
                        avatar: myAvater,
                        timestamp:new Date().getTime()
                    });
                }
                if (messagesToSend.length === 0) {
                    return;
                }
                // Reset attachments
                self.attachments = [];
                // Hide sheet
                self.sheetVisible = false;
                // Clear area
                self.messageText = '';
                // Focus area
                if (text.length) self.messagebar.focus();
                // Send message
                this.$dataManager.saveChatToBongo({
                    type:'sent',
                    name:mineInfo.userName,
                    text:text,
                    avatar: myAvater,
                    timestamp:timestamp
                })
                let index=this.messagesData.findIndex(chat => chat.timestamp === messagesToSend[0].timestamp)
                // Send message
                if(index<0){
                    self.messagesData.push(...messagesToSend);
                }
                console.log(self.messagesData)
                // if (self.responseInProgress) return;
                // self.responseInProgress = true;
            },
        },
    }
</script>

<style scoped>
    div[class*="col"] {
        background: #fff;
        text-align: center;
        color: #000;
        border: 1px solid #ddd;
        padding: 0px;
        margin-bottom: 0px;
        font-size: 12px;
    }

    .list-block{
        background: white;
        padding: 0px;
        margin: 8px;
    }
</style>
