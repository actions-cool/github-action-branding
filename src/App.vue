<template>
  <div id="main">
    <input id="copy-text" />
    <div class="header">
      <h1>
        <span class="title">GitHub</span>
        <span class="title">Action</span>
        <span class="title">Branding</span>
      </h1>
    </div>
    <div class="body">
      <div class="body-main">
        <div class="search">
          <div class="search-box">
            <div class="search-svg">
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
            </div>
            <input
              ref="input"
              v-model="searchKey"
              type="text"
              :placeholder="'Search ' + Object.keys(icons).length + ' icons ( Press / to focus )'"
            />
          </div>
        </div>
        <div class="content">
          <div class="container">
            <feather-icon
              v-for="item in filterColorList"
              :key="item.name"
              :color="color ? color : getColor()"
              :icon="item"
              @success-click="showMessage"
            ></feather-icon>
          </div>
        </div>
      </div>
      <div class="color-list" :key="date">
        <div class="color-picker-item random" @click="e => setColor(e, '')">
          <div class="color-picker-item-text">random</div>
        </div>
        <div
          v-for="(item, key) in presetPalettes"
          :key="key"
          class="color-picker-item"
          :style="
            'background:' + item + (key === 'yellow' || key === 'white' ? ';color: black;' : '')
          "
          @click="e => setColor(e, item)"
        >
          <div class="color-picker-item-text">{{ key }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, ref, onMounted } from 'vue';
import { icons } from 'feather-icons';
import FeatherIcon from './components/feather-icon';
import { getIcon } from './utils';
const presetPalettes = {
  white: 'white',
  yellow: '#ffd33d',
  blue: '#0366d6',
  green: '#28a745',
  orange: '#f66a0a',
  red: '#d73a49',
  purple: '#6f42c1',
  'gray-dark': '#24292e',
};

export default defineComponent({
  name: 'App',
  components: {
    FeatherIcon,
  },
  setup() {
    const input = ref();
    const date = ref(new Date().getTime());
    const colorList = Object.keys(presetPalettes);
    const searchKey = ref('');
    const color = ref('');
    const filterColorList = computed(() => {
      return searchKey.value ? filterList(icons, searchKey.value) : icons;
    });
    const { getColor } = randomColor(colorList);
    const setColor = (e, val) => {
      if (!val) {
        date.value = new Date().getTime();
        color.value = val;
        return false;
      }
      if (color.value === val) {
        getIcon(e, val, 'Copied');
      } else {
        color.value = val;
      }
    };
    const showMessage = name => {
      console.log(name);
    };
    onMounted(() => {
      document.onkeyup = e => {
        if (e.key === '/') {
          input.value.focus();
        }
      };
    });
    return {
      // template,
      icons,
      getColor,
      filterColorList,
      searchKey,
      presetPalettes,
      color,
      setColor,
      showMessage,
      date,
      input,
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
    return presetPalettes[colorList[Math.floor(Math.random() * colorList.length)]];
  }
  return {
    getColor,
  };
}
</script>
