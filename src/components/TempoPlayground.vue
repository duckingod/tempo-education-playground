<script setup lang="ts">
import { ref, watch } from 'vue'
import draggable from 'vuedraggable'
import Bar from './Bar.vue'
import { state } from '../globals';
import { sum, cloneDeep } from 'lodash';
import { svgs } from '../constants';
import trashCan from '../assets/trash-can.svg'
import { Beat } from '../types';

const candidates = ref<Beat[]>([
  { length: 1/4, svg: 'quarter-note' },
  { length: 1/4, svg: 'quarter-rest' },
  { length: 1/4, svg: 'double-eighth-note' },
  { length: 1/2, svg: 'half-note' },
  { length: 1/2 + 1/4, svg: 'dotted-half-note' },
  { length: 1, svg: 'whole-note' },
]);

const handleMove = (e) => {
  const { list } = e.relatedContext;
  return sum(((list ?? []) as Beat[]).map((item) => item?.length ?? 0)) + state.draggingBeat.length <= 1;
}

const trash = ref([
]);
watch(trash, () => {
  if (trash.value.length !== 0) {
    trash.value = [];
  }
});
</script>

<template>
  <draggable
    style="display: flex; flex-direction: row; gap: 1em; justify-content: center;"
    v-model="candidates"
    :group="{ name: 'beats', pull: 'clone', put: false }"
    :clone="(e) => { state.draggingBeat = e; return cloneDeep(e); }"
    ghost-class="ghost"
    :move="handleMove"
    item-key="id">
    <template #item="{index, element}">
        <div :key="index" style="width: 96px">
          <img :src="svgs[element.svg]"/>
        </div>
    </template>
  </draggable>

  <div style="display: flex; flex-direction: row; margin-top: 6em">
    <div class="signature">
      <div style="height: 0.55em;">4</div>
      <div>4</div>
    </div>
    <bar style="margin: 0 1em" />
    <div style="width: 4px; height: 6em; background-color: #000;"></div>
    <bar style="margin: 0 1em" />
    <div style="width: 4px; height: 6em; background-color: #000;"></div>
    <div style="margin-left: 4px; width: 12px; height: 6em; background-color: #000;"></div>
  </div>
  <br/>

  <div style="margin-top: 8em">
    <draggable
      style="width: 100%; height: 128px;"
      v-model="trash"
      :group="{ name: 'beats', pull: false, put: () => true }"
      ghost-class="trash-ghost"
      item-key="id">
      <template #item="{index, element}">
        <div :key="index"><div></div></div>
      </template>
    </draggable>
    <div
      style="margin-top: -128px; display: flex; flex-direction: row; height: 96px; justify-content: center;"
    >
      <img :src="trashCan" />
    </div>
  </div>
</template>

<style>
.signature {
    font-family: "Maestro", Helvetica, Arial;
    font-size: 6em;
    margin-top: -72px;
}
.ghost {
  opacity: 0.5;
}
.trash-ghost {
  display: none;
}
</style>
