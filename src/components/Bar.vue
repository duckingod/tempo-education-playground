<script setup lang="ts">
import { PropType } from 'vue'
import draggable from 'vuedraggable'
import { svgs } from '../constants';
import { sumBy } from 'lodash';
import { state } from '../globals';
import { Rhythm } from '../types';
import { dragToLengthCheck } from '../utils';

const { modelValue } = defineProps({
  modelValue: {
    type: Array as PropType<Rhythm[]>,
    required: true,
  },
});

const handleMove = (e) => {
  if (e.from !== e.to) {
    return dragToLengthCheck(e);
  }
}
const ggg = console;
</script>

<template>
  <draggable style="display: flex; flex-direction: row; gap: 0.25em; height: 96px; min-width: 396px;"
    :clone="(e) => { state.draggingRhythm = e; return e; }" :model-value="modelValue"
    @update:modelValue="$emit('update:modelValue', $event); ggg.log($event)" group="beats" ghost-class="ghost"
    :move="handleMove" item-key="id">
    <template #item="{ index, element }">
      <div :key="index" :style="{ width: `${24 * sumBy(element.beats, 'length')}em` }">
        <div style="width: 6em">
          <img :src="svgs[element.svg]" />
        </div>
      </div>
    </template>
  </draggable>
</template>
