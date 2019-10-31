<template>
    <div class="blank">
        加载中，请稍候...
    </div>
</template>

<script>
    export default {
        name:"blank",
        mounted() {
            // 获取href中的access_token
            let href = window.location.href;
            if (href) {
                let accessToken = href.match(/\?SUST_TK=(.*)/)[1];
                // console.log("token:",accessToken);
                sessionStorage.setItem("token", accessToken);
                this.axios
                    .get(this.mainUrl + '/api/v1.0/sys/login/login', {
                        params: {
                            'access_token': accessToken
                        }
                    })
                    .then((res) => {
                        console.log("login_info", res);
                        if (res.data.status === 'success') {
                            if (!res.data.data.telphone || !res.data.data.email) {              // 邮箱或手机号为空，跳转到添加信息页面
                                this.$router.push({
                                    name: 'addInfo',
                                    params: {
                                        username: res.data.data.thirdPartyId,
                                        password: res.data.data.avatar
                                    }
                                });
                            } else {
                                // 存储用户信息
                                let userInfos = {
                                    username: res.data.data.thirdPartyId,
                                    password: res.data.data.avatar,
                                };
                                let userInfoStore = Object.assign(res.data.data, userInfos);
                                this.$store.commit('SET_USERINFO', userInfoStore);
                                sessionStorage.setItem("userInfoStore", JSON.stringify(userInfoStore));

                                // 发送请求，传入用户名和密码
                                let params = new URLSearchParams();
                                params.append("username", res.data.data.thirdPartyId);
                                params.append("password", res.data.data.avatar);
                                this.axios
                                    .post(this.mainUrl + '/api/v1.0/sys/login/form', params)
                                    .then((res) => {
                                        console.log("form", res);
                                        // 将用户信息存入vuex
                                        this.$store.commit('SET_USERID', res.data.principal.username);
                                        sessionStorage.setItem("user_id",res.data.principal.username);
                                        sessionStorage.setItem("login_token", res.headers.authorization);
                                        if (res.data.authenticated) {
                                            // 返回首页
                                            this.$router.push({path: '/'});
                                        }
                                    })
                                    .catch((error) => {
                                        console.log("form_err", error);
                                    })
                            }
                        } else {
                            console.log("errorMsg",res.data.errorMsg);
                        }
                    })
                    .catch((err) => {
                      console.error("blank",err);
                    });
            }
        }
    }
</script>

<style scoped>
  .blank{
    font-size: 16px;
  }
</style>
