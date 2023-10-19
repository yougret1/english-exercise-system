<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "./styles/index.scss";
@import "./styles/toFormat.scss";
.icon {
  width: 40px;
  height: 40px;
}
#app{
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #F2F2F2;
  background-image: url(./assets/images/texture.png);

}
</style>
