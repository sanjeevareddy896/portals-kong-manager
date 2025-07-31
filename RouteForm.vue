<template>
  <div class="route-form">
    <!-- Route Configuration Fields -->
    <div class="form-fields-full">
      <!-- Route Host Field -->
      <div class="field-group-full">
        <label class="field-label">
          Route Host <span class="required-asterisk">*</span>
          <span class="info-icon" title="The hostname that this route will match">ⓘ</span>
        </label>
        <input
          v-model="formData.host"
          placeholder="e.g. api.example.com"
          class="field-input"
          @input="emitUpdate"
        />
      </div>

      <!-- Route Path Field -->
      <div class="field-group-full">
        <label class="field-label">
          Route Path
          <span class="info-icon" title="The path that this route will match (defaults to '/')">ⓘ</span>
        </label>
        <input
          v-model="formData.path"
          placeholder="/"
          class="field-input"
          @input="emitUpdate"
        />
        <div class="field-hint">default: "/"</div>
      </div>

      <!-- HTTP Methods -->
      <div class="field-group-full">
        <label class="field-label">
          HTTP Methods <span class="required-asterisk">*</span>
          <span class="info-icon" title="Select the HTTP methods this route will accept">ⓘ</span>
        </label>
        <div class="methods-row">
          <label 
            v-for="method in httpMethods" 
            :key="method"
            class="method-button"
            :class="{ 'selected': formData.methods.includes(method) }"
          >
            <input
              type="checkbox"
              :value="method"
              v-model="formData.methods"
              class="method-checkbox"
              @change="emitUpdate"
            />
            <span class="method-text">{{ method }}</span>
          </label>
        </div>
      </div>

      <!-- Protocols -->
      <div class="field-group-full">
        <label class="field-label">
          Protocols <span class="required-asterisk">*</span>
          <span class="info-icon" title="Select the protocols this route will accept">ⓘ</span>
        </label>
        <div class="methods-row">
          <label 
            v-for="protocol in ['http', 'https']" 
            :key="protocol"
            class="method-button"
            :class="{ 'selected': formData.protocols.includes(protocol) }"
          >
            <input
              type="checkbox"
              :value="protocol"
              v-model="formData.protocols"
              class="method-checkbox"
              @change="emitUpdate"
            />
            <span class="method-text">{{ protocol.toUpperCase() }}</span>
          </label>
        </div>
      </div>

      <!-- Preserve Host -->
      <div class="field-group-full">
        <label class="field-label">
          Preserve Host <span class="required-asterisk">*</span>
          <span class="info-icon" title="Whether to preserve the original Host header">ⓘ</span>
        </label>
        <div class="radio-group">
          <label class="radio-label">
            <input
              type="radio"
              value="true"
              v-model="formData.preserveHost"
              class="radio-input"
              @change="emitUpdate"
            />
            <span class="radio-text">Yes (preserve original Host header)</span>
          </label>
          <label class="radio-label">
            <input
              type="radio"
              value="false"
              v-model="formData.preserveHost"
              class="radio-input"
              @change="emitUpdate"
            />
            <span class="radio-text">No (use upstream Host header)</span>
          </label>
        </div>
      </div>

      <!-- Strip Path -->
      <div class="field-group-full">
        <label class="checkbox-single">
          <input
            type="checkbox"
            v-model="formData.stripPath"
            class="checkbox-input"
            @change="emitUpdate"
          />
          <span class="checkbox-text">Strip Path</span>
          <span class="info-icon" title="Whether to strip the matched path from the upstream request">ⓘ</span>
        </label>
      </div>

      <!-- Regex Priority -->
      <div class="field-group-full">
        <label class="field-label">
          Regex Priority
          <span class="info-icon" title="Determines the order of route evaluation when multiple routes match">ⓘ</span>
        </label>
        <input
          v-model.number="formData.regexPriority"
          type="number"
          placeholder="0"
          class="field-input"
          @input="emitUpdate"
        />
        <div class="field-hint">Higher numbers have higher priority (default: 0)</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue'

// Props
const props = defineProps<{
  initialData?: any
  hideActionButtons?: boolean
  hideHeader?: boolean
}>()

// Emits
const emit = defineEmits<{
  'update:formData': [formData: any]
}>()

// HTTP Methods
const httpMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD']

// Form Data
const formData = reactive({
  host: '',
  path: '/',
  methods: [] as string[],
  protocols: ['http', 'https'] as string[],
  preserveHost: 'false' as string,
  stripPath: true,
  regexPriority: 0
})

// Initialize form data
onMounted(() => {
  if (props.initialData) {
    Object.assign(formData, props.initialData)
  }
  
  // Ensure default values
  if (!formData.path) {
    formData.path = '/'
  }
  if (!formData.methods || formData.methods.length === 0) {
    formData.methods = []
  }
  if (!formData.protocols || formData.protocols.length === 0) {
    formData.protocols = ['http', 'https']
  }
  if (!formData.preserveHost) {
    formData.preserveHost = 'false'
  }
})

// Watch for changes and emit updates
watch(formData, (newData) => {
  emit('update:formData', { ...newData })
}, { deep: true })

// Emit update function
const emitUpdate = () => {
  emit('update:formData', { ...formData })
}

// Watch for initial data changes from parent
watch(() => props.initialData, (newData) => {
  if (newData) {
    Object.assign(formData, newData)
  }
}, { deep: true, immediate: true })

// Expose formData for parent component access
defineExpose({
  formData
})
</script>

<style scoped>
.route-form {
  width: 100%;
}

.form-fields-full {
  width: 100%;
}

.field-group-full {
  margin-bottom: 1rem;
  width: 100%;
  position: relative;
}

.field-group-full:last-child {
  margin-bottom: 0;
}

.field-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  color: #374151;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.required-asterisk {
  color: #dc2626;
  font-weight: 700;
}

.info-icon {
  color: #6b7280;
  cursor: help;
  font-size: 0.8rem;
}

.field-input {
  width: 100%;
  padding: 0.75rem 0.875rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  background: #fafafa;
  box-sizing: border-box;
}

.field-input:focus {
  outline: none;
  border-color: #2563eb;
  background: white;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.field-hint {
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.25rem;
  font-weight: 500;
}

/* Radio and Checkbox Groups */
.radio-group {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: #374151;
}

.radio-input {
  margin: 0;
  width: 1rem;
  height: 1rem;
  accent-color: #667eea;
}

.radio-text {
  font-weight: 500;
}

.checkbox-single {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: #374151;
  font-weight: 500;
}

.checkbox-input {
  width: 1.1rem;
  height: 1.1rem;
  accent-color: #667eea;
  margin: 0;
}

.checkbox-text {
  font-weight: 500;
}

/* HTTP Methods */
.methods-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}

.method-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  font-weight: 500;
  color: #374151;
  position: relative;
  min-width: 60px;
  text-align: center;
}

.method-button:hover {
  background: #f3f4f6;
  border-color: #9ca3af;
}

.method-button.selected {
  background: #667eea;
  border-color: #667eea;
  color: white;
}

.method-checkbox {
  display: none; /* Hide default checkbox */
}

.method-text {
  font-weight: 500;
  pointer-events: none;
}

/* Responsive Design */
@media (max-width: 768px) {
  .methods-row {
    gap: 0.5rem;
  }
  
  .method-button {
    min-width: 50px;
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
}
</style>