<script setup lang="ts">
import * as accordion from "@zag-js/accordion"
import { accordionControls, accordionData } from "@zag-js/shared"
import { normalizeProps, useMachine } from "@zag-js/vue"
import { ChevronRight } from "lucide-vue-next"

const controls = useControls(accordionControls)

const service = useMachine(accordion.machine, { id: useId() })

const api = computed(() => accordion.connect(service, normalizeProps))
</script>

<template>
  <main class="accordion">
    <div v-bind="api.getRootProps()">
      <div v-for="item in accordionData" v-bind="api.getItemProps({ value: item.id })">
        <h3>
          <button :data-testid="`${item.id}:trigger`" v-bind="api.getItemTriggerProps({ value: item.id })">
            {{ item.label }}
            <div v-bind="api.getItemIndicatorProps({ value: item.id })">
              <ChevronRight />
            </div>
          </button>
        </h3>
        <div :data-testid="`${item.id}:content`" v-bind="api.getItemContentProps({ value: item.id })">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </div>
      </div>
    </div>
  </main>

  <Toolbar>
    <StateVisualizer :state="service" />
    <template #controls>
      <Controls :control="controls" />
    </template>
  </Toolbar>
</template>
