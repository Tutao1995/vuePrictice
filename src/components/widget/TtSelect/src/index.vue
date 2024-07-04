<template>
  <div>
    <button ref="dropdownButton" @click="toggleDropdown">下拉菜单</button>
    <teleport to="body">
      <transition name="fade">
        <ul v-if="isOpen" class="dropdown-menu" :style="dropdownStyle" @click="selectOption">
          <li v-for="option in options" :key="option.id">{{ option.text }}</li>
        </ul>
      </transition>
    </teleport>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  data() {
    return {
      isOpen: false,
      options: [
        { id: 1, text: '选项1' },
        { id: 2, text: '选项2' },
        { id: 3, text: '选项3' }
      ],
      dropdownStyle: {
        transform: 'translate(0, 0)'
      }
    };
  },
  mounted() {
    window.addEventListener('scroll', this.adjustDropdownPosition);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.adjustDropdownPosition);
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.adjustDropdownPosition();
      }
    },
    selectOption(event) {
      const selectedOption = event.target.innerText;
      console.log('选中的选项：', selectedOption);
    },
    adjustDropdownPosition() {
      const buttonRect = this.$refs.dropdownButton.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      this.dropdownStyle.transform = `translate(${buttonRect.left}px, ${buttonRect.bottom + scrollTop}px)`;
    }
  }
};
</script>

<style>
.dropdown-menu {
  position: relative;
  transform-origin: top left;
}
</style>