<template>
  <div id="main">
    <textarea id="copy-text"></textarea>
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
              :color="color.length ? color : item.color"
              :icon="item"
              @success-click="showMessage"
            ></feather-icon>
          </div>
        </div>
      </div>
      <div class="color-list">
        <div class="color-picker-item random" @click="e => setColor(e, [])">
          <div class="color-picker-item-text">random</div>
        </div>
        <div
          v-for="(item, key) in presetPalettes"
          :key="key"
          class="color-picker-item"
          :style="
            (color[1] === presetPalettes[key] ? 'cursor: copy;' : 'cursor: pointer;') +
            'background:' +
            item +
            (key === 'yellow' || key === 'white' ? ';color: black;' : '')
          "
          @click="e => setColor(e, [key, item])"
        >
          <div class="color-picker-item-text">{{ key }}</div>
        </div>
        <template v-if="brandingColor && iconName">
          <div class="branding" @click="getBringding">
            <div class="b-title">
              <i class="b-circle b-red"></i>
              <i class="b-circle b-yellow"></i>
              <i class="b-circle b-green"></i>
            </div>
            <div class="title">
              branding
              <div>:</div>
            </div>
            <div class="title">
              icon
              <div>: '{{ iconName }}'</div>
            </div>
            <div class="title">
              color
              <div>: '{{ brandingColor }}'</div>
            </div>
          </div>
          <feather-icon
            class="branding-icon"
            :color="presetPalettes[brandingColor]"
            :icon="icons[iconName]"
          ></feather-icon>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref, onMounted, onBeforeMount } from 'vue';
import { icons } from 'feather-icons';
import FeatherIcon from './components/feather-icon';
import { getIcon } from './utils';
const presetPalettes: Record<string, string> = {
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
    const iconName = ref('');
    const colorList = Object.keys(presetPalettes);
    const searchKey = ref('');
    const color = ref<Array<string>>([]);
    const brandingColor = ref('');
    const filterColorList = ref(icons);
    watch(
      () => searchKey.value,
      val => {
        filterColorList.value = filterList(icons, val);
      },
    );
    const { getColor } = randomColor(colorList);
    const setColor = (e: MouseEvent, val: string[]) => {
      if (!val.length) {
        for (let i in icons) {
          setIconColor(icons[i], getColor());
        }
        iconName.value = '';
        color.value = [];
        brandingColor.value = '';
        return false;
      }
      if (color.value[1] === val[1]) {
        getIcon(e, val[0], 'Copied');
      } else {
        color.value = val;
        brandingColor.value = val[0];
      }
    };
    const showMessage = (name: string, colorItem: string[]) => {
      iconName.value = name;
      brandingColor.value = colorItem[0];
    };
    const getBringding = (e: MouseEvent) => {
      const val = `# https://actions-cool.github.io/github-action-branding/
branding:
  icon: '${iconName.value}'
  color: '${color.value[0]}'
`;
      getIcon(e, val, 'Copied');
    };
    onBeforeMount(() => {
      for (let i in icons) {
        setIconColor(icons[i], getColor());
      }
    });
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
      input,
      iconName,
      getBringding,
      brandingColor,
    };
  },
});

function setIconColor(icon: Record<string, any>, color: string[]) {
  return (icon.color = color);
}

function filterList(list: Record<string, any>, searchKey: string) {
  const filterTarget: Record<string, any> = {};
  for (let i in list) {
    if (i.indexOf(searchKey) !== -1) {
      filterTarget[i] = list[i];
    }
  }
  return filterTarget;
}

function randomColor(colorList: string[]) {
  function getColor() {
    const cRam = colorList[Math.floor(Math.random() * colorList.length)];
    return [cRam, presetPalettes[cRam]];
  }
  return {
    getColor,
  };
}
</script>
