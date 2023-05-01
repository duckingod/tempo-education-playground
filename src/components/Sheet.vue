<template>
  <div class="sheet-container">
    <div class="signature">
      4<br>4
    </div>
    <div style="display: flex; flex-direction: row;">
      <Bar :model-value="bars[0].value" @update:model-value="bars[0].value = $event" style="margin: 0 1em" />
      <div style="margin-left: 16px; width: 4px; height: 6em; background-color: #000;"></div>
    </div>
    <div style="display: flex; flex-direction: row;">
      <Bar :model-value="bars[1].value" @update:model-value="bars[1].value = $event" style="margin: 0 1em" />
      <div>
        <div style="display: inline-block; width: 4px; height: 6em; background-color: #000;"></div>
        <div style="display: inline-block; margin-left: 4px; width: 12px; height: 6em; background-color: #000;"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue';
import { Rhythm } from '../types';
import Bar from './Bar.vue';

const props = defineProps({
  modelValue: {
    type: Array as PropType<Rhythm[][]>,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const bars = computed(() => props.modelValue.map((bar, index, array) => computed({
  get() {
    return bar;
  },
  set(value) {
    emit('update:modelValue', array.map((item, i) => i === index ? value : item));
  },
})));
</script>

<style lang="scss">
.sheet-container {
  // display: grid;
  // width: 1200px;
  grid-template-columns: [signature-start] 40px repeat(auto-fill, [bars] 450px);
  display: grid;
  gap: 10px;
  // grid-template: repeat(4, 1fr) / repeat(2, 1fr);
  grid-auto-flow: column;
  /* or 'row', 'row dense', 'column dense' */
}

.inside-container {
  display: inline-flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 1em;
  justify-content: start;
  align-items: start;
}

.signature {
  font-size: 3.5em;
  line-height: 48px;
}
</style>