<template>
  <input id="copy-text" />
  <div class="title">
    <div v-html="template"></div>
    <div class="color-list">
      <div class="color-picker-item random" @click="setColor('')">random</div>
      <div
        v-for="(item, key) in presetPalettes"
        :key="key"
        class="color-picker-item"
        :style="
          'background:' +
          item.primary +
          (key === 'yellow' ? ';color: black;' : '')
        "
        @click="setColor(item.primary)"
      >
        {{ key }}
      </div>
      <div class="color-picker-item color-white" @click="setColor('white')">
        white
      </div>
    </div>

    <div class="search">
      <svg
        viewBox="0 0 24 24"
        width="24"
        color="#666"
        height="24"
        stroke="currentColor"
        stroke-width="2"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="css-1hy7qas"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <input v-model="searchKey" type="text" placeholder="Search icons" />
    </div>
  </div>
  <div class="container">
    <feather-icon
      v-for="item in filterColorList"
      :key="item.name"
      :color="color ? color : getColor()"
      :icon="item"
      @success-click="showMessage"
    ></feather-icon>
  </div>
</template>

<script>
import { defineComponent, computed, ref } from "vue";
import { icons } from "feather-icons";
import FeatherIcon from "./components/feather-icon";
import template from "./components/html.md";
import { presetPalettes } from "@ant-design/colors";

export default defineComponent({
  name: "App",
  components: {
    FeatherIcon,
  },
  setup() {
    const colorList = Object.keys(presetPalettes);
    const searchKey = ref("");
    const color = ref("");
    const filterColorList = computed(() => {
      return searchKey.value ? filterList(icons, searchKey.value) : icons;
    });
    const { getColor } = randomColor(colorList);
    const setColor = (val) => {
      color.value = val;
    };
    const showMessage = (name) => {
      console.log(name)
    } 
    return {
      template,
      icons,
      getColor,
      filterColorList,
      searchKey,
      presetPalettes,
      color,
      setColor,
      showMessage,
    };
  },
});

function filterList(list, searchKey) {
  const filterTarget = {};
  for (let i in list) {
    if (i.indexOf(searchKey) !== -1) {
      filterTarget[i] = list[i];
    }
  }
  return filterTarget;
}

function randomColor(colorList) {
  function getColor() {
    return presetPalettes[
      colorList[Math.floor(Math.random() * colorList.length)]
    ].primary;
  }
  return {
    getColor,
  };
}
</script>

<style>
body {
  background: rgb(213, 236, 229);
}
.title {
  margin: 10px 20px;
}
.container {
  display: grid;
  transition: all 0.5s;
  grid-template-columns: repeat(auto-fill, 100px);
  grid-gap: 30px;
}
.search {
  display: flex;
  align-items: center;
  width: 50%;
  margin: 0;
  padding: 8px 16px;
  font-size: inherit;
  font-family: inherit;
  color: inherit;
  background-color: #fff;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%);
  border: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: 0;
  border-radius: 6px;
}
.search input {
  color: inherit;
  outline: none;
  border: none;
  width: 100%;
  font-size: 20px;
  margin-left: 10px;
}
.color-list {
  display: flex;
  width: 80%;
  justify-content: space-between;
}
.color-picker-item {
  margin: 10px;
  width: 100px;
  text-align: center;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgb(0 0 0 / 20%);
  transition: all 0.2s;
}
.color-picker-item:active {
  transform: scale(0.9, 0.9) translateY(2px);
}
.random {
  background-image: linear-gradient(
    to right,
    rgb(245, 34, 45),
    rgb(250, 219, 20),
    rgb(82, 196, 26),
    rgb(47, 84, 235),
    rgb(235, 47, 150)
  );
}
.color-white {
  background: white;
  color: black;
}
#copy-text {
  position: fixed;
  top: -100px;
}
</style>