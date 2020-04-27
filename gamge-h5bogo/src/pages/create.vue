<template>
    <f7-page no-toolbar no-navbar no-swipeback>
        <f7-block style="margin-top: 30%">
            <f7-row style="">
                <f7-col class="flex-align-center">
                    <div style="width:70%">
                        <f7-list no-hairlines-md>
                            <f7-list-input
                                label="Name"
                                type="text"
                                placeholder="Nick name"
                                clear-button
                                :value="userName"
                                @input="userName = $event.target.value"
                            >
                            </f7-list-input>
                            <f7-list-input
                                    label="Gender"
                                    type="select"
                                    :value="gender"
                                    @input="gender = $event.target.value"
                                    placeholder="Please choose..."
                                >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </f7-list-input>
                            <f7-list-input
                                label="Birthday"
                                type="date"
                                defaultValue="2014-04-30"
                                placeholder="Please choose..."
                                :value="birthData"
                                @input="birthData = $event.target.value"
                            >
                            </f7-list-input>
                        </f7-list>
                    </div>
                </f7-col>
            </f7-row>
            <f7-row>
                <f7-col class="flex-align-center">
                    <div style="width:70%">
                        <f7-button block big fill social style="width:100%" @click="CreateUser">
                            <span>Complete</span>
                        </f7-button>
                    </div>
                </f7-col>
            </f7-row>
        </f7-block>
    </f7-page>
</template>
<script>
    import { mapState, mapMutations, mapGetters } from 'vuex'
    import Request from '../socket/up.js';
    import Response from '../socket/down.js';
    import Types from '../socket/types.js';
    export default {
        data() {
            return {
                userName: 'player',
                birthData: '2014-04-30',
                gender: 'Male',
                
                dataManager: this.$store.state.$dataManager
            };
        },
        computed: {
            ...mapState({
                user: state => state.user
            })
        },
        methods: {
            
            ...mapMutations(['setUserId','setUserInfo']),
            ...mapGetters(['getUserId']),

            CreateUser: function (data) {
                let sex = this.gender == 'Male' ? 0 : 1;
                console.log('sex is  ' + sex);
                let msg = Request.up.create_user.create({
                    _user_name: this.userName,
                    _sex: sex,
                    _other_info:'',
                    _is_robot: 0  
                });
                let buf = Request.up.create_user.encode(msg).finish();
                this.$websocket.send(Types.MsgEnum.create_user, buf).then((msg)=>{
                        let userId = this.$store.getters.getUserId();
                        this.getUserInfo(userId);
                    },
                    (msg)=>{
                        //open create page
                        let error = Response.down.exception.decode(msg);
                        const app = this.$f7;
                        app.dialog.alert(error._result._err_desc);
                    }
                )

                /*
                .catch((msg)=>{
                    //open create page
                    var error = Response.down.exception.decode(msg);
                    const app = this.$f7;
                    app.dialog.alert(error._result._err_desc);
                });
                */
            },

            getUserInfo( uid ){
                this.$dataManager.getUser(uid).then((user)=>{
                    this.$f7router.navigate('/home/');
                    this.setUserInfo(user);
                })
                .catch((msg)=>{
                    //alert error message
                });
            },
        }
    };
</script>

<style scoped>
    .flex-align-center{
        display:flex; 
        align-items:center; 
        justify-content:center
    }
</style>

