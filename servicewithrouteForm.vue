<template>
  <div class="onboard-portal-wrapper">
    <!-- Full Width Header -->
    <div class="header-full">
      <div class="header-content">
        <div class="header-left">
      <div class="logo-badge animated-glow small-badge">
        <!-- Simple SVG Portal Icon -->
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="18" fill="#667eea" stroke="#764ba2" stroke-width="1"/>
          <ellipse cx="20" cy="20" rx="12" ry="16" fill="#f3f4f6" opacity="0.6"/>
          <ellipse cx="20" cy="20" rx="8" ry="12" fill="#f3f4f6" opacity="0.8"/>
          <ellipse cx="20" cy="20" rx="4" ry="8" fill="#f3f4f6" opacity="1"/>
          <circle cx="20" cy="20" r="3" fill="#fff" opacity="0.9"/>
        </svg>
      </div>
          <div class="header-text">
            <h1 class="main-title">
              <span class="title-icon">🚀</span>
              API Gateway Onboarding
            </h1>
            <p class="subtitle">Streamline your API deployment with our guided service and route configuration wizard</p>
          </div>
        </div>
        <div class="header-right">
          <div class="status-badge">
            <span class="status-dot"></span>
            In Progress
          </div>
        </div>
      </div>
    </div>

    <!-- Full Width Content -->
    <div class="content-full">
      <!-- General Information Section -->
      <div class="config-section-full">
        <div class="section-header">
          <h2 class="section-title">
            <span class="section-icon">📋</span>
            General Information
          </h2>
          <p class="section-description">
            Provide basic details to identify and organize your gateway service effectively
          </p>
        </div>

        <!-- General Information Fields -->
        <div class="form-fields-full">
          <!-- Service Name Field -->
          <div class="field-group-full">
              <label class="field-label">
              Service Name <span class="required-asterisk">*</span>
              <span class="info-icon" title="A unique name for this gateway service">ⓘ</span>
              </label>
              <input
                v-model="generalInfo.name"
              placeholder="Enter service name"
                class="field-input"
              />
            </div>

          <!-- Tags Field -->
          <div class="field-group-full">
              <label class="field-label">
                Tags
              <span class="info-icon" title="Tags are labels that can be used to group and filter services">ⓘ</span>
              </label>
              <input
                v-model="generalInfo.tags"
                placeholder="Enter tags (comma-separated)"
              class="field-input"
              />
          </div>
        </div>
      </div>

      <!-- Service Configuration Section -->
      <div class="config-section-full">
        <div class="section-header">
          <h2 class="section-title">
            <span class="section-icon">⚙️</span>
            Service Configuration
          </h2>
          <p class="section-description">
            Configure how your service connects to upstream APIs and handles incoming requests
          </p>
        </div>

        <!-- Configuration Options -->
        <div class="config-options-full">
          <div class="option-group-full">
            <div 
              class="option-box-full" 
              :class="{ 'selected': serviceConfig.type === 'url' }"
              @click="serviceConfig.type = 'url'"
            >
              <div class="option-header">
                <div class="option-icon url-icon">🔗</div>
                <div class="option-radio">
                  <input
                    type="radio"
                    id="url"
                    v-model="serviceConfig.type"
                    value="url"
                    class="radio-input"
                  />
                  <label for="url" class="radio-label"></label>
                </div>
                </div>
              <div class="option-content">
                <h3 class="option-title">URL Configuration</h3>
                <p class="option-description">
                  Quick setup with a single upstream URL. Perfect for standard API services with a single endpoint.
                </p>
              </div>
            </div>
            
            <div 
              class="option-box-full" 
              :class="{ 'selected': serviceConfig.type === 'manual' }"
              @click="serviceConfig.type = 'manual'"
            >
              <div class="option-header">
                <div class="option-icon protocol-icon">🔧</div>
                <div class="option-radio">
                  <input
                    type="radio"
                    id="manual"
                    v-model="serviceConfig.type"
                    value="manual"
                    class="radio-input"
                  />
                  <label for="manual" class="radio-label"></label>
                </div>
                </div>
              <div class="option-content">
                <h3 class="option-title">Advanced Configuration</h3>
                <p class="option-description">
                  Complex setup with custom protocols, host, port, and path for sophisticated use cases.
                </p>
              </div>
            </div>
          </div>
          
          <!-- Form Fields -->
          <div class="form-fields-full">
            <!-- URL Configuration Fields -->
            <div v-if="serviceConfig.type === 'url'" class="url-fields">
              <!-- Spacer -->
              <div class="field-spacer"></div>
              
              <!-- URL Field -->
              <div class="field-group-full">
              <label class="field-label">
                  URL <span class="required-asterisk">*</span>
                  <span class="info-icon" title="The complete URL of the upstream service">ⓘ</span>
              </label>
              <input
                v-model="serviceConfig.url"
                  placeholder="e.g. https://api.example.com/v1"
                class="field-input"
                />
              </div>

              <!-- View Advanced Fields Link -->
              <div class="advanced-link">
                <a href="#" @click.prevent="serviceConfig.type = 'manual'" class="advanced-link-text">
                  View advanced fields
                  <span class="advanced-icon">▼</span>
                </a>
            </div>
          </div>
          
                      <!-- Advanced Configuration Fields -->
          <div v-if="serviceConfig.type === 'manual'" class="protocol-fields">
            <!-- Spacer -->
            <div class="field-spacer"></div>
            
            <!-- Protocol and Host Fields -->
            <div class="field-row">
              <div class="field-group-half">
                <label class="field-label">
                  Protocol <span class="required-asterisk">*</span>
                  <span class="info-icon" title="The protocol to use when communicating with the upstream service">ⓘ</span>
                </label>
                <select v-model="serviceConfig.protocol" class="field-input">
                  <option value="http">HTTP</option>
                  <option value="https">HTTPS</option>
                  <option value="tcp">TCP</option>
                  <option value="tls">TLS</option>
                  <option value="grpc">gRPC</option>
                  <option value="grpcs">gRPCS</option>
                </select>
              </div>

              <div class="field-group-half">
                <label class="field-label">
                  Host <span class="required-asterisk">*</span>
                  <span class="info-icon" title="The hostname of the upstream service">ⓘ</span>
                </label>
                <input
                  v-model="serviceConfig.host"
                  placeholder="e.g. api.example.com"
                  class="field-input"
                />
              </div>
            </div>

            <!-- Port and Path Fields -->
            <div class="field-row">
              <div class="field-group-half">
                <label class="field-label">
                  Port <span class="required-asterisk">*</span>
                  <span class="info-icon" title="The port number of the upstream service">ⓘ</span>
                </label>
                <input
                  v-model="serviceConfig.port"
                  type="number"
                  placeholder="e.g. 80"
                  class="field-input"
                />
              </div>

              <div class="field-group-half">
                <label class="field-label">
                  Path
                  <span class="info-icon" title="The path to the upstream service (defaults to '/')">ⓘ</span>
                </label>
                <input
                  v-model="serviceConfig.path"
                  placeholder="/"
                  class="field-input"
                />
                <div class="field-hint">default: "/"</div>
            </div>
          </div>

            <!-- Advanced Configuration Fields -->
            <div class="field-spacer"></div>
            
            <!-- Connect Timeout and Read Timeout -->
            <div class="field-row">
              <div class="field-group-half">
                  <label class="field-label">
                  Connect Timeout
                  <span class="info-icon" title="The timeout in milliseconds for establishing a connection to the upstream service (default: 60000ms)">ⓘ</span>
                  </label>
                  <input
                  v-model="serviceConfig.connectTimeout"
                    type="number"
                    placeholder="60000"
                  class="field-input"
                  />
                <div class="field-hint">milliseconds (default: 60000)</div>
                </div>

              <div class="field-group-half">
                  <label class="field-label">
                  Read Timeout
                  <span class="info-icon" title="The timeout in milliseconds for reading data from the upstream service (default: 60000ms)">ⓘ</span>
                  </label>
                  <input
                  v-model="serviceConfig.readTimeout"
                    type="number"
                    placeholder="60000"
                  class="field-input"
                  />
                <div class="field-hint">milliseconds (default: 60000)</div>
                </div>
            </div>

            <!-- Write Timeout and Retries -->
            <div class="field-row">
              <div class="field-group-half">
                  <label class="field-label">
                  Write Timeout
                  <span class="info-icon" title="The timeout in milliseconds for writing data to the upstream service (default: 60000ms)">ⓘ</span>
                  </label>
                  <input
                  v-model="serviceConfig.writeTimeout"
                    type="number"
                    placeholder="60000"
                  class="field-input"
                  />
                <div class="field-hint">milliseconds (default: 60000)</div>
                </div>

              <div class="field-group-half">
                  <label class="field-label">
                  Retries
                  <span class="info-icon" title="The number of retries to attempt when the upstream service is unavailable (default: 5)">ⓘ</span>
                  </label>
                  <input
                  v-model="serviceConfig.retries"
                    type="number"
                    placeholder="5"
                  class="field-input"
                  />
                <div class="field-hint">attempts (default: 5)</div>
                </div>
            </div>

              <!-- View URL Fields Link -->
              <div class="advanced-link">
                <a href="#" @click.prevent="serviceConfig.type = 'url'" class="advanced-link-text">
                  View URL fields
                  <span class="advanced-icon">▲</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Route Configuration Section -->
      <div class="config-section-full">
        <div class="section-header">
          <h2 class="section-title">
            <span class="section-icon">🛣️</span>
            Route Configuration
          </h2>
          <p class="section-description">
            Define how incoming requests are routed to your service and configure advanced routing options
          </p>
        </div>
        <div class="section-content">
          <div class="route-config-wrapper">
                        <RouteForm 
              ref="routeFormRef"
              :hide-action-buttons="true" 
              :hide-header="true"
              :initial-data="routeConfig"
              @update:form-data="updateRouteConfig"
            />
                </div>
              </div>
            </div>
            

            
      <!-- Action Buttons -->
      <div class="action-buttons-full">
        <div class="section-header">
          <h2 class="section-title">
            <span class="section-icon">✅</span>
            Review and Submit
          </h2>
          <p class="section-description">
            Review your configuration and submit for approval
          </p>
            </div>
            <div class="section-content">
          <div class="action-content">
            <!-- Error Messages -->
            <div class="error-messages" v-if="validationErrors.length > 0">
              <div class="error-item" v-for="error in validationErrors" :key="error">
                <div class="error-icon">⚠️</div>
                <span class="error-text">{{ error }}</span>
                </div>
              </div>
              
            <!-- Mandatory Fields Status -->
            <div class="mandatory-status" v-if="!areAllMandatoryFieldsFilled">
              <div class="status-header">
                <span class="status-icon">📋</span>
                <span class="status-title">Required Fields Status</span>
                </div>
              <div class="status-items">
                <div class="status-item" :class="{ 'completed': !!generalInfo.name.trim() }">
                  <span class="status-dot" :class="{ 'completed': !!generalInfo.name.trim() }"></span>
                  <span class="status-text">Service Name</span>
              </div>
                <div class="status-item" :class="{ 'completed': serviceConfig.type === 'url' ? !!serviceConfig.url.trim() : (!!serviceConfig.protocol && !!serviceConfig.host.trim() && !!serviceConfig.port) }">
                  <span class="status-dot" :class="{ 'completed': serviceConfig.type === 'url' ? !!serviceConfig.url.trim() : (!!serviceConfig.protocol && !!serviceConfig.host.trim() && !!serviceConfig.port) }"></span>
                  <span class="status-text">Service Configuration</span>
                </div>
                <div class="status-item" :class="{ 'completed': !!routeConfig.host.trim() }">
                  <span class="status-dot" :class="{ 'completed': !!routeConfig.host.trim() }"></span>
                  <span class="status-text">Route Host</span>
              </div>
                <div class="status-item" :class="{ 'completed': !!routeConfig.preserveHost }">
                  <span class="status-dot" :class="{ 'completed': !!routeConfig.preserveHost }"></span>
                  <span class="status-text">Preserve Host</span>
            </div>
                <div class="status-item" :class="{ 'completed': !!(routeConfig.methods && routeConfig.methods.length > 0) }">
                  <span class="status-dot" :class="{ 'completed': !!(routeConfig.methods && routeConfig.methods.length > 0) }"></span>
                  <span class="status-text">HTTP Methods</span>
          </div>
                <div class="status-item" :class="{ 'completed': !!(routeConfig.protocols && routeConfig.protocols.length > 0) }">
                  <span class="status-dot" :class="{ 'completed': !!(routeConfig.protocols && routeConfig.protocols.length > 0) }"></span>
                  <span class="status-text">Protocols</span>
        </div>
      </div>
    </div>

            <!-- Action Buttons -->
            <div class="button-group">
              <button
                class="cancel-btn"
                @click="onCancel"
                :disabled="loading"
              >
            Cancel
          </button>
              <button
                class="view-config-btn"
                @click="onViewConfiguration"
                :disabled="loading"
              >
            View Configuration
          </button>
          <button 
                class="submit-btn"
                :disabled="!isFormValid || loading"
            @click="onSubmitForApproval"
          >
                <span v-if="loading" class="loading-spinner-small"></span>
                {{ loading ? 'Submitting...' : 'Submit for Approval' }}
          </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Configuration Preview Modal -->
    <div v-if="showConfigModal" class="modal-overlay" @click="showConfigModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Configuration Preview</h3>
          <button class="modal-close" @click="showConfigModal = false">×</button>
        </div>
        <div class="modal-body">
          <div class="config-preview">
            <div class="preview-section">
              <h4>Service Configuration</h4>
              <pre>{{ JSON.stringify(buildServicePayload(), null, 2) }}</pre>
            </div>
            <div class="preview-section">
              <h4>Route Configuration</h4>
              <pre>{{ JSON.stringify(buildRoutePayload(), null, 2) }}</pre>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="showConfigModal = false">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import RouteForm from '@/components/onboard/routes/src/components/RouteForm.vue'

// Props
const props = defineProps<{
  initialData?: any
  isEditMode?: boolean
}>()

// Emits
const emit = defineEmits<{
  submit: [formData: any]
  cancel: []
}>()

const router = useRouter()

// Helper function to get current user from auth system
const getCurrentUser = () => {
  // Try to get user info from localStorage/sessionStorage
  const userInfo = localStorage.getItem('userInfo') || sessionStorage.getItem('userInfo')
  if (userInfo) {
    try {
      const parsed = JSON.parse(userInfo)
      return parsed.username || parsed.email || parsed.id || 'unknown-user'
    } catch (e) {
      console.warn('Failed to parse user info:', e)
    }
  }
  
  // Try to get username from localStorage
  const username = localStorage.getItem('username') || sessionStorage.getItem('username')
  if (username) return username
  
  // Try to get email from localStorage
  const email = localStorage.getItem('email') || sessionStorage.getItem('email')
  if (email) return email
  
  // Fallback to 'unknown-user'
  return 'unknown-user'
}

// State
const showServiceAdvanced = ref(false)
const showRouteAdvanced = ref(false)
const showConfigModal = ref(false)
const loading = ref(false)
const error = ref('')
const routeFormRef = ref()

// General Information
const generalInfo = reactive({
  name: '',
  tags: ''
})

// Service Configuration
const serviceConfig = reactive({
  type: 'url',
  url: '',
  protocol: 'http',
  host: '',
  port: 80,
  path: '/', // Default path value
  connectTimeout: 60000,
  readTimeout: 60000,
  writeTimeout: 60000,
  retries: 5
})

// Route Configuration
const routeConfig = reactive({
  type: 'basic',
  path: '',
  host: '',
  methods: [] as string[],
  protocols: ['http', 'https'] as string[],
  preserveHost: 'false' as string,
  stripPath: true,
  regexPriority: 0
})

// HTTP Methods
const httpMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD']

// Watch for general info changes and sync with service/route
watch(() => generalInfo.name, (newName) => {
  // The name will be used for both service and route
})

watch(() => generalInfo.tags, (newTags) => {
  // The tags will be used for both service and route
})

// Initialize route config with default values
onMounted(() => {
  console.log('ServiceWithRouteForm mounted with props:', props)
  
  // If we have initial data, populate the forms
  if (props.initialData) {
    console.log('Populating forms with initial data:', props.initialData)
    
    // Populate general info
    if (props.initialData.generalInfo) {
      generalInfo.name = props.initialData.generalInfo.name || ''
      generalInfo.tags = props.initialData.generalInfo.tags || ''
    }
    
    // Populate service config
    if (props.initialData.serviceConfig) {
      Object.assign(serviceConfig, props.initialData.serviceConfig)
    }
    
    // Populate route config
    if (props.initialData.routeConfig) {
      console.log('Populating route config with:', props.initialData.routeConfig)
      Object.assign(routeConfig, props.initialData.routeConfig)
      console.log('Route config after population:', routeConfig)
    }
    
    console.log('Forms populated:', { generalInfo, serviceConfig, routeConfig })
  } else {
    // Ensure route config has proper default values
    if (!routeConfig.path) {
      routeConfig.path = '/'
    }
    if (!routeConfig.methods || routeConfig.methods.length === 0) {
      routeConfig.methods = []
    }
    if (!routeConfig.protocols || routeConfig.protocols.length === 0) {
      routeConfig.protocols = ['http', 'https']
    }
    if (!routeConfig.preserveHost) {
      routeConfig.preserveHost = 'false'
    }
  }
  
  console.log('Final routeConfig after initialization:', routeConfig)
})

// Edit mode detection
const isEditMode = computed(() => {
  return router.currentRoute.value.name === 'service-request-edit'
})

// Validation
const validationErrors = computed(() => {
  const errors: string[] = []
  
  // General Information validation
  if (!generalInfo.name.trim()) {
    errors.push('Service Name is required')
  }
  
  // Service validation
  if (serviceConfig.type === 'url') {
    if (!serviceConfig.url.trim()) {
      errors.push('Service URL is required')
    } else {
      // Validate URL format (must include http:// or https://)
      const urlPattern = /^https?:\/\/.+/
      if (!urlPattern.test(serviceConfig.url.trim())) {
        errors.push('Service URL must include http:// or https:// protocol')
      }
    }
  } else {
    if (!serviceConfig.protocol) {
      errors.push('Service Protocol is required')
    }
    if (!serviceConfig.host.trim()) {
      errors.push('Service Host is required')
    }
    if (!serviceConfig.port) {
      errors.push('Service Port is required')
    }
  }
  
  // Route validation
  if (!routeConfig.host.trim()) {
    errors.push('Route Host is required')
  }
  if (!routeConfig.preserveHost) {
    errors.push('Preserve Host selection is required')
  }
  if (!routeConfig.methods || routeConfig.methods.length === 0) {
    errors.push('At least one HTTP Method is required')
  }
  if (!routeConfig.protocols || routeConfig.protocols.length === 0) {
    errors.push('At least one Protocol is required')
  }
  
  return errors
})

// Check if all mandatory fields are filled
const areAllMandatoryFieldsFilled = computed(() => {
  // General Information
  const hasServiceName = !!generalInfo.name.trim()
  
  // Service Configuration
  let hasServiceConfig = false
  if (serviceConfig.type === 'url') {
    const hasValidUrl = !!serviceConfig.url.trim() && /^https?:\/\/.+/.test(serviceConfig.url.trim())
    hasServiceConfig = hasValidUrl
  } else {
    const hasProtocol = !!serviceConfig.protocol
    const hasHost = !!serviceConfig.host.trim()
    const hasPort = !!serviceConfig.port
    hasServiceConfig = hasProtocol && hasHost && hasPort
  }
  
  // Route Configuration
  const hasRouteHost = !!routeConfig.host.trim()
  const hasPreserveHost = !!routeConfig.preserveHost
  const hasMethods = !!(routeConfig.methods && routeConfig.methods.length > 0)
  const hasProtocols = !!(routeConfig.protocols && routeConfig.protocols.length > 0)
  
  return hasServiceName && hasServiceConfig && hasRouteHost && hasPreserveHost && hasMethods && hasProtocols
})

const isFormValid = computed(() => {
  const isValid = areAllMandatoryFieldsFilled.value && validationErrors.value.length === 0
  console.log('Form validation status:', {
    areAllMandatoryFieldsFilled: areAllMandatoryFieldsFilled.value,
    validationErrors: validationErrors.value,
    isFormValid: isValid,
    routeHost: routeConfig.host,
    routeMethods: routeConfig.methods
  })
  return isValid
})

// Build service payload
const buildServicePayload = () => {
  const payload: any = {
    name: generalInfo.name,
    tags: parseTags(generalInfo.tags),
    connect_timeout: serviceConfig.connectTimeout,
    read_timeout: serviceConfig.readTimeout,
    write_timeout: serviceConfig.writeTimeout,
    retries: serviceConfig.retries
  }
  
  if (serviceConfig.type === 'url') {
    payload.url = serviceConfig.url.trim()
  } else {
    payload.protocol = serviceConfig.protocol
    payload.host = serviceConfig.host.trim()
    payload.port = serviceConfig.port
    // Default to "/" if no path provided
    if (serviceConfig.path && serviceConfig.path.trim()) {
      payload.path = serviceConfig.path.trim()
    } else {
      payload.path = '/'
    }
  }
  
  return payload
}

// Build route payload
const buildRoutePayload = () => {
  console.log('Building route payload with routeConfig:', routeConfig)
  
  const payload: any = {
    name: generalInfo.name,
    tags: parseTags(generalInfo.tags),
    strip_path: routeConfig.stripPath,
    regex_priority: routeConfig.regexPriority
  }
  
  // Always include paths array, default to "/" if no path provided
  if (routeConfig.path && routeConfig.path.trim()) {
    payload.paths = [routeConfig.path.trim()]
  } else {
    payload.paths = ['/'] // Default to root path if none provided
  }
  
  if (routeConfig.host && routeConfig.host.trim()) {
    payload.hosts = [routeConfig.host.trim()]
  }
  
  if (routeConfig.methods.length > 0) {
    payload.methods = routeConfig.methods
  }
  
  if (routeConfig.protocols.length > 0) {
    payload.protocols = routeConfig.protocols
  }
  
  console.log('Built route payload:', payload)
  return payload
}

// Parse tags string to array
const parseTags = (tagsStr: string) => {
  if (!tagsStr.trim()) return []
  return tagsStr.split(',').map(tag => tag.trim()).filter(tag => tag)
}

// Update route config from RouteForm component
const updateRouteConfig = (formData: any) => {
  console.log('Updating route config with form data:', formData)
  
  routeConfig.host = formData.host || ''
  routeConfig.methods = formData.methods || []
  routeConfig.protocols = formData.protocols || []
  routeConfig.preserveHost = formData.preserveHost || 'false'
  routeConfig.path = formData.path || '/'
  routeConfig.stripPath = formData.stripPath || true
  routeConfig.regexPriority = formData.regexPriority || 0
  
  console.log('Updated route config:', routeConfig)
}

// Navigation handlers
const onCancel = () => {
  // If we're in edit mode or have a parent component, emit cancel
  if (props.isEditMode || Object.keys(emit).length > 0) {
    console.log('Emitting cancel to parent component')
    emit('cancel')
  } else {
  router.push('/services')
  }
}

const onViewConfiguration = () => {
  showConfigModal.value = true
}

const onSubmitForApproval = async () => {
  if (!isFormValid.value) {
    return
  }
  
  try {
    // Manually sync route data from RouteForm component
    if (routeFormRef.value && routeFormRef.value.formData) {
      console.log('Manually syncing route data from RouteForm')
      updateRouteConfig(routeFormRef.value.formData)
    }
    
    // Ensure route config is properly synced before building payload
    console.log('Before submission - routeConfig:', routeConfig)
    
    const servicePayload = buildServicePayload()
    const routePayload = buildRoutePayload()
    
    // Create approval request
    const approvalRequest = {
      service: servicePayload,
      route: routePayload,
      status: 'pending',
      requestedBy: getCurrentUser(), // Get from auth system
      requestedAt: new Date().toISOString(),
      description: `Service and route creation request for "${generalInfo.name}"`
    }
    
    // Debug: Log what we're sending
    console.log('Submitting approval request:', JSON.stringify(approvalRequest, null, 2))
    console.log('Service payload:', servicePayload)
    console.log('Route payload:', routePayload)
    console.log('Route paths being sent:', routePayload.paths)
    
    // If we're in edit mode or have a parent component, emit the data
    if (props.isEditMode || Object.keys(emit).length > 0) {
      console.log('Emitting form data to parent component')
      emit('submit', approvalRequest)
    } else {
    // Submit to approval system (use the correct backend endpoint)
    // Get authentication token from localStorage or session storage
    const authToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken') || localStorage.getItem('token') || sessionStorage.getItem('token')
    
    const headers: any = {
      'Content-Type': 'application/json'
    }
    
    // Add authorization header if token exists
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`
    }
    
    await axios.post('/api/service-approval-requests', approvalRequest, {
      headers
    })
    
    // Show success message
    alert(`Service request "${generalInfo.name}" submitted for approval successfully!`)
    
    // Redirect to service requests page
    router.push('/service-requests')
    }
    
  } catch (error: any) {
    console.error('Failed to submit approval request:', error)
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      alert('Authentication failed. Please log in again to submit the approval request.')
    } else if (error.response?.status === 403) {
      alert('You do not have permission to submit approval requests. Please contact your administrator.')
    } else {
      alert(`Failed to submit approval request: ${error.response?.data?.message || error.message}`)
    }
  }
}
</script>

<style scoped>
.onboard-portal-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
}

/* Full Width Header */
.header-full {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.25rem 1.5rem 0.75rem 1.5rem;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}

.header-full::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  z-index: 1;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  position: relative;
  z-index: 2;
}

.header-left {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.header-text {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}



.main-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin: 0 0 0.375rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  word-wrap: break-word;
}

.title-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.8rem;
  margin: 0;
  font-weight: 400;
  line-height: 1.4;
  word-wrap: break-word;
}

.status-badge {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 4px rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
  white-space: nowrap;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.status-dot {
  width: 6px;
  height: 6px;
  background: white;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Logo Badge */
.logo-badge {
  width: 48px;
  height: 48px;
  margin: 0 auto 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 2;
}

.logo-badge.small-badge {
  width: 40px;
  height: 40px;
  margin: 0 auto 0.75rem;
}

.logo-badge.animated-glow {
  animation: glow 3s ease-in-out infinite alternate;
}

@keyframes glow {
  from { box-shadow: 0 0 10px rgba(255, 255, 255, 0.3); }
  to { box-shadow: 0 0 20px rgba(255, 255, 255, 0.5); }
}

/* Full Width Content */
.content-full {
  flex: 1;
  padding: 1.5rem;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.compact-header {
  margin-top: 0;
  margin-bottom: 0.5rem;
  padding-top: 0.5rem;
}
.header-bg-gradient {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: 100px;
  background: linear-gradient(120deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  filter: blur(20px) brightness(1.2);
  opacity: 0.15;
  z-index: 0;
  border-radius: 0 0 30px 30px;
}
.small-gradient {
  height: 60px;
  top: -10px;
  filter: blur(12px) brightness(1.1);
}
.logo-badge {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  border-radius: 50%;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1);
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 1;
  overflow: hidden;
}
.small-badge {
  width: 32px;
  height: 32px;
}
.animated-glow {
  animation: portal-glow 3s infinite alternate;
}
@keyframes portal-glow {
  0% { 
    box-shadow: 0 0 20px 6px rgba(102, 126, 234, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 30px 10px rgba(240, 147, 251, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.15);
    transform: scale(1.05);
  }
  100% { 
    box-shadow: 0 0 25px 8px rgba(118, 75, 162, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1);
    transform: scale(1);
  }
}
.portal-title {
  font-size: 2rem;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0 0 0.2rem 0;
  letter-spacing: -0.5px;
  z-index: 1;
  position: relative;
}
.small-title {
  font-size: 1.5rem;
  font-weight: 800;
}
.portal-subtitle {
  font-size: 1rem;
  color: #5a5a7a;
  margin: 0;
  font-weight: 400;
  z-index: 1;
  position: relative;
  line-height: 1.4;
}
.small-subtitle {
  font-size: 0.95rem;
}

/* Configuration Section */
.config-section-full {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(229, 231, 235, 0.5);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
}

.config-section-full::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px 16px 0 0;
}

.section-header {
  margin-bottom: 1rem;
  width: 100%;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.section-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 0.25rem 0;
  word-wrap: break-word;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.section-icon {
  font-size: 0.9rem;
  flex-shrink: 0;
}

.section-description {
  color: #6b7280;
  font-size: 0.8rem;
  line-height: 1.4;
  margin: 0;
  word-wrap: break-word;
}

/* Configuration Options */
.config-options-full {
  margin-bottom: 1.5rem;
  width: 100%;
}

.option-group-full {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  width: 100%;
}

.option-box-full {
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 1px 3px rgba(30, 41, 59, 0.03);
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  overflow: hidden;
  min-height: 80px;
}

.option-box-full::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #e5e7eb 0%, #d1d5db 100%);
  transition: all 0.3s ease;
}

.option-box-full.selected {
  border-color: #2563eb;
  box-shadow: 0 8px 32px rgba(37, 99, 235, 0.15);
  transform: translateY(-2px);
}

.option-box-full.selected::before {
  background: linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%);
}

.option-header {
  display: flex;
  align-items: center;
  position: relative;
}

.option-icon {
  font-size: 1rem;
  margin-right: 0.5rem;
}

.option-radio {
  position: absolute;
  top: 0;
  right: 0;
}

.radio-input {
  display: none;
}

.radio-label {
  width: 20px;
  height: 20px;
  border: 2px solid #d1d5db;
  border-radius: 50%;
  position: relative;
  transition: all 0.2s ease;
  display: block;
}

.option-box-full.selected .radio-label {
  border-color: #2563eb;
  background: #2563eb;
}

.option-box-full.selected .radio-label::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
}

.option-content {
  margin-top: 1rem;
}

.option-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 0.2rem 0;
}

.option-description {
  font-size: 0.7rem;
  color: #6b7280;
  line-height: 1.2;
  margin: 0;
}

/* Form Fields */
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

/* Field Layout Classes */
.field-spacer {
  height: 1rem;
  width: 100%;
}

.field-row {
  display: flex;
  gap: 1rem;
  width: 100%;
  margin-bottom: 0.75rem;
}

.field-group-half {
  flex: 1;
  min-width: 0;
}

.field-group-half:last-child {
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

/* Advanced Link */
.advanced-link {
  margin-top: 1rem;
}

.advanced-link-text {
  color: #2563eb;
  font-weight: 600;
  font-size: 15px;
  text-decoration: underline;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.advanced-link-text:hover {
  color: #2563eb;
}

.advanced-icon {
  font-size: 1.1em;
  margin-left: 2px;
}

/* Review Summary */
.review-summary {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.summary-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

.summary-item:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.summary-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  background: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.summary-content h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
}

.summary-content p {
  margin: 0;
  font-size: 0.9rem;
  color: #6b7280;
  line-height: 1.4;
}

/* Route Configuration Wrapper */
.route-config-wrapper {
  width: 100%;
  max-width: 100%;
}

/* Action Buttons */
.action-buttons-full {
  background: white;
  border-top: 1px solid #e5e7eb;
  padding: 1.25rem;
  width: 100%;
  box-sizing: border-box;
  margin-top: 0.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(229, 231, 235, 0.5);
  position: relative;
  overflow: hidden;
}

.action-buttons-full::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px 16px 0 0;
}

.action-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 3rem;
  width: 100%;
}

.action-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  padding: 0.625rem 0.875rem;
  background: #f8fafc;
  border-radius: 8px;
  border-left: 4px solid #3b82f6;
}

.action-icon {
  font-size: 0.9rem;
  flex-shrink: 0;
}

.action-text {
  font-size: 0.8rem;
  color: #374151;
  font-weight: 500;
}

.error-messages {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.error-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #dc2626;
  font-size: 0.8rem;
}

.error-icon {
  font-size: 0.9rem;
  flex-shrink: 0;
}

.error-text {
  color: #dc2626;
  font-weight: 500;
  font-size: 0.8rem;
}

.error-icon {
  font-size: 1rem;
}

.button-group {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  flex-shrink: 0;
}

.cancel-btn {
  padding: 0.625rem 1.25rem;
  background: #f8fafc;
  color: #374151;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cancel-btn:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.cancel-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.view-config-btn {
  padding: 0.625rem 1.25rem;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

.view-config-btn:hover {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

.view-config-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.save-btn {
  padding: 0.625rem 1.25rem;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
}

.save-btn:hover {
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
}

.save-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.loading-spinner-small {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-full {
    padding: 1rem;
  }
  
  .content-full {
    padding: 1rem;
  }
  
  .option-group-full {
    grid-template-columns: 1fr;
  }
  
  .option-box-full {
    min-width: 0;
    margin-right: 0;
  }
  
  .button-group {
    flex-direction: column;
  }
  
  .main-title {
    font-size: 1.5rem;
  }
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.modal-header {
  padding: 1.25rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a1a1a;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  color: #6b7280;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  color: #374151;
}

.modal-body {
  padding: 1.25rem;
  overflow-y: auto;
  flex: 1;
}

.config-preview {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.preview-section h4 {
  margin: 0 0 0.625rem 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: #1a1a1a;
}

.preview-section pre {
  background: #f3f4f6;
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.9rem;
  overflow-x: auto;
  margin: 0;
}

.modal-footer {
  padding: 0.875rem 1.25rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
}

.btn-secondary:hover {
  background: #e5e7eb;
}

/* Portal Form Container */
.portal-form {
  width: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 1.5rem;
  flex: 1;
}

.section-header {
  padding: 1.5rem 1.5rem 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.section-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #667eea;
  flex-shrink: 0;
}

.section-icon svg {
  width: 24px;
  height: 24px;
}

.section-info {
  flex: 1;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
}

.section-description {
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.4;
}

.section-content {
  padding: 1rem;
  min-height: 150px;
  width: 100%;
}

/* Enhanced Configuration Cards */
.config-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.config-card {
  background: #fff;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.25rem;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.config-card:hover {
  border-color: #667eea;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
  transform: translateY(-2px);
}

.config-card.active {
  border-color: #667eea;
  background: linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%);
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.2);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.4rem;
}

.card-icon {
  font-size: 1.25rem;
  margin-bottom: 0.4rem;
  color: #667eea;
  flex-shrink: 0;
}

.card-content {
  flex: 1;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.card-description {
  font-size: 0.85rem;
  color: #6b7280;
  line-height: 1.4;
  margin: 0;
}

.card-indicator {
  width: 14px;
  height: 14px;
  border: 2px solid #d1d5db;
  border-radius: 50%;
  flex-shrink: 0;
  margin-left: 0.5rem;
  transition: all 0.2s ease;
}

.card-indicator.active {
  border-color: #667eea;
  background: #667eea;
  position: relative;
}

.card-indicator.active::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 6px;
  background: #fff;
  border-radius: 50%;
}

/* Enhanced Form Fields */
.config-form {
  background: #f8fafc;
  border-radius: 8px;
  padding: 1.25rem;
  margin-top: 1rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-field {
  margin-bottom: 1rem;
}

.field-label {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
  font-size: 0.9rem;
}

.label-text {
  font-weight: 500;
}

.required-indicator {
  color: #dc2626;
  font-size: 0.9rem;
  margin-left: 0.2rem;
}

.info-icon {
  color: #6b7280;
  font-size: 0.8rem;
  cursor: help;
  margin-left: 0.2rem;
}

.field-input,
.field-select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  background: #fff;
}

.field-input:focus,
.field-select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.field-hint {
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.25rem;
  font-weight: 500;
}

/* Radio and Checkbox Groups */
.radio-group,
.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.radio-label,
.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: #374151;
}

.radio-input,
.checkbox-input {
  margin: 0;
  width: 1rem;
  height: 1rem;
  accent-color: #667eea;
}

.radio-text,
.checkbox-text {
  font-weight: 500;
}

/* Advanced Section */
.advanced-section {
  margin-top: 1.25rem;
  padding-top: 1.25rem;
  border-top: 1px solid #e5e7eb;
}

/* Basic Configuration Sub-section */
.basic-config-section {
  margin-top: 1.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.sub-section-header {
  padding: 1rem 1.25rem;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.sub-section-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.basic-config-section .section-content {
  padding: 1.25rem;
}

.checkbox-single {
  display: flex;
  align-items: center;
}

.checkbox-single .checkbox-label {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: #374151;
  font-weight: 500;
}

.checkbox-single .checkbox-input {
  width: 1.1rem;
  height: 1.1rem;
  accent-color: #667eea;
  margin: 0;
}

.checkbox-single .checkbox-text {
  font-weight: 500;
}

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

.method-button input:checked + .method-text {
  color: #667eea;
  font-weight: 600;
}

.method-button input:checked {
  background: #667eea;
  border-color: #667eea;
}

.method-button input:checked + .method-text {
  color: white;
  font-weight: 600;
}

.method-checkbox {
  display: none; /* Hide default checkbox */
}

.method-text {
  font-weight: 500;
  pointer-events: none;
}

/* Advanced Settings Link */
.advanced-link-section {
  margin-top: 1.25rem;
  text-align: center;
}

.advanced-link {
  background: none;
  border: none;
  padding: 0;
  color: #667eea;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  text-decoration: none;
}

.advanced-link:hover {
  color: #5a67d8;
  text-decoration: underline;
}

.advanced-link .link-text {
  font-weight: 500;
}

.advanced-link .link-icon {
  font-size: 1rem;
  color: #f59e0b;
}

.advanced-link .arrow-icon {
  font-size: 0.8rem;
  transition: transform 0.3s ease;
  color: #667eea;
}

.advanced-link .arrow-icon.expanded {
  transform: rotate(180deg);
}

/* Enhanced Toggle Button */
.toggle-btn {
  background: none;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 1rem;
}

.toggle-btn:hover {
  background: #f9fafb;
  border-color: #d1d5db;
  color: #374151;
}

.toggle-icon {
  transition: transform 0.3s ease;
  color: #667eea;
}

.toggle-icon.rotated {
  transform: rotate(180deg);
}

.advanced-content {
  background: #f8fafc;
  border-radius: 8px;
  padding: 1.25rem;
  margin-top: 1rem;
}

/* Action Footer */
.action-footer {
  position: sticky;
  bottom: 0;
  background: white;
  border-top: 1px solid #e5e7eb;
  padding: 0.875rem 1.5rem;
  margin: 0.875rem -1.5rem -1.5rem -1.5rem;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.06);
  flex-shrink: 0;
  width: calc(100% + 3rem);
}

.footer-content {
  width: 100%;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.875rem;
}

.validation-status {
  flex: 1;
}

.validation-errors {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.error-message {
  color: #dc2626;
  font-size: 0.9rem;
  font-weight: 600;
}

.validation-success {
  color: #059669;
  font-size: 0.9rem;
  font-weight: 600;
}

.action-buttons {
  display: flex;
  gap: 0.625rem;
}

/* Buttons */
.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
}

.btn-secondary:hover:not(:disabled) {
  background: #e5e7eb;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #5a67d8;
}

.btn-success {
  background: #10b981;
  color: white;
}

.btn-success:hover:not(:disabled) {
  background: #059669;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1.25rem;
}

.modal-content {
  background: white;
  border-radius: 10px;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
}

.modal-header {
  padding: 0.875rem 1.25rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  color: #6b7280;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  color: #374151;
}

.modal-body {
  padding: 1.25rem;
  overflow-y: auto;
  flex: 1;
}

.config-preview {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.preview-section h4 {
  margin: 0 0 0.625rem 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: #1a1a1a;
}

.preview-section pre {
  background: #f3f4f6;
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.9rem;
  overflow-x: auto;
  margin: 0;
}

.modal-footer {
  padding: 0.875rem 1.25rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
}

/* Responsive Design */
@media (max-width: 768px) {
  .onboard-portal-wrapper {
    padding: 0;
  }
  
  .portal-title {
    font-size: 1.3rem;
  }
  
  .logo-badge {
    width: 32px;
    height: 32px;
  }
  
  .config-options {
    grid-template-columns: 1fr;
  }
  
  .footer-content {
    flex-direction: column;
    align-items: stretch;
    gap: 0.625rem;
  }
  
  .action-buttons {
    justify-content: center;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .portal-form {
    padding: 0 1rem;
  }
  
  .action-footer {
    margin: 0.625rem -1rem -1rem -1rem;
    width: calc(100% + 2rem);
    padding: 0.875rem 1rem;
  }
}

/* Mandatory Fields Status */
.mandatory-status {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.status-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.status-icon {
  font-size: 1rem;
}

.status-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

.status-items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: #6b7280;
}

.status-item.completed {
  color: #059669;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #d1d5db;
  flex-shrink: 0;
}

.status-dot.completed {
  background: #10b981;
}
</style>
