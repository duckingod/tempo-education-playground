<template>
  <div style="display: flex; flex-direction: row; margin-top: 2em">
    <div class="signature">
      <div style="height: 0.8em;">4</div>
      <div>4</div>
    </div>
    <Bar :model-value="bars[0].value" @update:model-value="bars[0].value = $event" style="margin: 0 1em" />
    <div style="width: 4px; height: 6em; background-color: #000;"></div>
    <Bar :model-value="bars[1].value" @update:model-value="bars[1].value = $event" style="margin: 0 1em" />
    <div style="width: 4px; height: 6em; background-color: #000;"></div>
    <div style="margin-left: 4px; width: 12px; height: 6em; background-color: #000;"></div>
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