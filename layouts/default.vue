<template>
  <div>
    <div v-if="$nuxt.isOffline">
      <div class="h-100vh d-flex justify-content-center flex-column align-items-center">
        <h3 class="text-night-blue mb-2 font-weight-semibold text-center">
          İnternet bağlantınızı kontrol ediniz
        </h3>
      </div>
    </div>
    <Nuxt v-else/>
  </div>
</template>

<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

::selection {
    background: #007cc2;
    color: #fff;
}
::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background: #e6e6e6;
    border-radius: 5px;
}
::-webkit-scrollbar-button {
    display: none;
}
::-webkit-scrollbar-thumb {
    background: #000000;
    border-radius: 5px;
}

img
{
  width:auto;
  height:auto;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
