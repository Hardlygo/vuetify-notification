<template>
  <v-container fluid pa-0>
    <v-row no-gutters style="flex-wrap: nowrap;">
      <v-col cols="11">
        <v-tabs v-model="active" light show-arrows center-active background-color="#fafafa" id="my-tabs" class=""
          style="border-bottom:1px solid #d3d3d3;border-top:1px solid #d3d3d3;">
          <v-tabs-slider color="blue darken-3"></v-tabs-slider>
          <v-tab v-for="(item,index) in visitedViews" :key="item.index" class="black--text"
            style="border-top:1px;border-left:1px;border-right:1px;border-bottom:0px;border-style:solid;border-color:#d3d3d3;margin: 2px 2px 0 2px;">
            <v-icon color="primary" v-if="item.meta.icon">{{item.meta.icon}}</v-icon>
            <v-icon color="primary" v-else>mdi-home</v-icon>&nbsp;
            {{item.title }}
            <v-btn v-if="!item.meta.affix" @click.stop="closeSelectedTag(item)" icon>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-tab>
        </v-tabs>
      </v-col>
      <v-col cols="1">
        <v-card class="d-flex flex-row justify-center" style="border:1px solid #d3d3d3;background-color:#fafafa" flat
          tile>
          <v-btn icon @click="refreshPage">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
          <v-btn icon @click="closePage">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import {
    VCard,
    VIcon,
    VBtn,
    VContainer,
    VRow,
    VCol,
    VTabs,
    VTab,
    VTabsSlider

  } from 'vuetify/lib'

  export default {
    name: "tag-view",
    // inject: ['reload'],
    components: {
      VCard,
      VIcon,
      VBtn,
      VContainer,
      VRow,
      VCol,
      VTabs,
      VTab,
      VTabsSlider
    },
    data() {
      return {
        active: null
      };
    },
    computed: {
      visitedViews() {
        return this.$store.state.tagsView.visitedViews;
      },
      routes() {
        var r = this.$store.state.routes.routes;
        return r;
      }
    },
    watch: {
      $route() {
        this.addTags();
      },
      active(val, old) {
        //记录当前的选择的tab index
        this.$store.commit('tagsView/Set_ACTIVE_INDEX', val);
        // 保存上一次的tab index
        this.$store.commit('tagsView/SET_LAST_ACTIVE_INDEX', old);
        //console.log("new",val,"old",old)
        if (val !== old) {
          this.moveToCurrentTag()
        }
      }
    },

    methods: {
      refreshPage() {
        // this.reload()
      },
      closePage() {
        let {
          closeSelectedTag
        } = this;
        if (!this.$route.meta.affix) {
          closeSelectedTag(this.$route);
        }
      },
      //跳转到选中页面
      moveToCurrentTag() {
        const {
          active
        } = this
        var latestView = null
        for (var i = 0; i < this.visitedViews.length; i++) {
          if (active == i) {
            latestView = this.visitedViews[i]
            break;
          }
        }
        if (latestView) {
          this.$router.push(latestView)
        }
      },
      isActive(route) {
        return route.path === this.$route.path
      },
      closeSelectedTag(view) {
        var currentView = this.visitedViews[this.active]
        this.$store.dispatch("tagsView/delView", view).then(({
          visitedViews
        }) => {
          //判断是否是关闭正在打开且不是最后一个页面，因为最后一个也页面删除会导致this.active马上改变，在导致路由变化导致判断不成立
          if (this.isActive(view)) {
            // if(this.active===0){
            this.toLastView(visitedViews)
            // }

          } else {
            var index = visitedViews.indexOf(currentView)
            if (index > -1) {
              this.active = index;
            }
          }
        })
      },
      toLastView(visitedViews) {
        const latestView = null
        if (this.active) {
          this.moveToCurrentTag()
          return;
        } else {
          const latestView = visitedViews.slice(-1)[0]

          if (latestView) {
            this.$router.push(latestView)
          } else {
            // You can set another route
            this.$router.push('/home')
          }
        }
      },
      initTags() {
        const affixTags = (this.affixTags = this.filterAffixTags(this.routes));
        for (const tag of affixTags) {
          // Must have tag name
          if (tag.name) {
            this.$store.dispatch("tagsView/addVisitedView", tag);
          }
        }
      },
      addTags() {
        const {
          name
        } = this.$route;
        if (name) {
          this.$store.dispatch("tagsView/addView", this.$route).then(() => {
            //切换到当前路由对应标签
            this.visitedViews.forEach((item, index) => {
              if (item.name == name) {
                this.active = index
              }
            })
          })
        }
        return false;
      },
      filterAffixTags(routes, basePath = "/") {
        let tags = [];
        routes.forEach(route => {
          if (route.meta && route.meta.affix) {
            const tagPath = path.resolve(basePath, route.path);
            tags.push({
              fullPath: tagPath,
              path: tagPath,
              name: route.name,
              meta: {
                ...route.meta
              }
            });
          }
          if (route.children) {
            const tempTags = this.filterAffixTags(route.children, route.path);
            if (tempTags.length >= 1) {
              tags = [...tags, ...tempTags];
            }
          }
        });
        return tags;
      }
    },
    mounted() {
      this.initTags();
      this.addTags();
    }
  };

</script>
<style>
  #my-tabs .theme--light.v-tabs__bar {
    background-color: #f3f3f3 !important;
  }

</style>
