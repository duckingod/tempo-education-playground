<script setup lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable'
import { svgs } from '../constants';
import { sum } from 'lodash';
import { state } from '../globals';
import { Beat } from '../types';

const items = ref([] as Beat[]);

const handleMove = (e) => {
  if (e.from !== e.to) {
    const { list } = e.relatedContext;
    const currentLength = sum(((list ?? []) as Beat[]).map((item) => item?.length ?? 0));
    const beatLength = state.draggingBeat.length;
    return currentLength + beatLength <= 1;
  }
}
</script>

<template>
    <draggable
      style="display: flex; flex-direction: row; gap: 0.25em; height: 96px; min-width: 396px;"
      :clone="(e) => { state.draggingBeat = e; return e; }"
      v-model="items"
      group="beats"
      ghost-class="ghost"
      :move="handleMove"
      item-key="id">
      <template #item="{index, element}">
        <div :key="index" :style="{ width: `${24 * element.length}em` }">
          <div style="width: 6em">
            <img :src="svgs[element.svg]"/>
          </div>
        </div>
      </template>
    </draggable>
</template>
