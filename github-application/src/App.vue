<template>
  <div>
    <md-toolbar class="md-medium">
      <md-button
        class="md-icon-button"
        @click.native="toggleSidenav"
      >
        <md-icon>menu</md-icon>
      </md-button>

      <h2 class="md-title">GitHub</h2>

      <md-input-container style="flex: 1">
        <md-input
          placeholder="Search username"
          v-model="username"
        ></md-input>
      </md-input-container>
    </md-toolbar>

    <md-sidenav
      class="md-left"
      ref="sidenav"
    >
      <md-toolbar class="md-medium">
        <md-button class="md-icon-button">
          <md-icon>menu</md-icon>
        </md-button>
        <h2 class="md-title">GitHub</h2>
      </md-toolbar>
      <md-list>
        <md-list-item>
          <router-link :to="{name: 'repositories'}">
            Repositories
          </router-link>
        </md-list-item>
        <md-list-item>
          <router-link :to="{name: 'user'}">
            User
          </router-link>
        </md-list-item>
      </md-list>

    </md-sidenav>

    <div class="main-content">
      <md-layout>
        <router-view></router-view>
      </md-layout>
    </div>
  </div>
</template>



<script>
import {router} from './bootstrap';
import _ from 'lodash';
import MdToolbar from "../node_modules/vue-material/src/components/mdToolbar/mdToolbar";
import MdButton from "../node_modules/vue-material/src/components/mdButton/mdButton";
import MdIcon from "../node_modules/vue-material/src/components/mdIcon/mdIcon";
import MdLayout from "../node_modules/vue-material/src/components/mdLayout/mdLayout";
import MdSidenav from "../node_modules/vue-material/src/components/mdSidenav/mdSidenav";
import MdList from "../node_modules/vue-material/src/components/mdList/mdList";
import MdListItem from "../node_modules/vue-material/src/components/mdList/mdListItemRouter";

export default {
  components: {
    MdListItem,
    MdList,
    MdSidenav,
    MdLayout,
    MdIcon,
    MdButton,
    MdToolbar},
  name: 'GithubApplication',

  router,

  data(){
      return {
        user: null,
        username: null,
        repositories:[],
      };
  },

  watch:{
      username(value){
         this.setUsername(value);
      },
  },

  methods: {
    fetcherUser(username){
      this.$http.get(`users/${username}`)
        .then(({data}) => {
          this.user = data;
        });
    },
    fetchRepositories(username){
        this.$http.get(`users/${username}/repos`)
          .then(({data}) => {
            this.repositories = data;
          });
    },
    toggleSidenav(){
      this.$refs.sidenav.toggle();
    },
    closeSidenav(){
      this.$refs.sidenav.close();
    },
    setUsername:_.debounce(function(username){
        if(username){
          this.fetcherUser(username);
          this.fetchRepositories(username);
        }
        else{
          this.user=null;
          this.repositories = [];
        }
    }, 500),
  },

//  mounted(){
//
//    this.fetcherUser('xingyuguucsd');
//  }

}
</script>


