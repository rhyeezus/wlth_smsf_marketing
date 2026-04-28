<template>
  <div class="flex flex-col">

    <!-- Step question heading — above the tracker -->
    <h3 v-if="isQuizStep" class="text-xl font-semibold text-white mb-3 font-sans">{{ stepHeading }}</h3>

    <!-- Progress stepper -->
    <div v-if="isQuizStep" class="flex items-center gap-3 mb-5">
      <button
        v-if="stepNumber > 1"
        class="text-white/50 hover:text-white text-sm transition-colors shrink-0 flex items-center gap-1"
        @click="goBack"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>
      <span class="text-sm font-semibold shrink-0" style="color: #05E6DD">Step {{ stepNumber }} of 5</span>
      <div class="flex-1 h-3 bg-white/20 rounded-full overflow-hidden">
        <div
          class="progress-fill h-full rounded-full transition-all duration-500"
          :style="{ width: `${(stepNumber / 5) * 100}%` }"
        />
      </div>
    </div>

    <Transition name="step" mode="out-in">
      <div :key="step" class="lg:flex-1 lg:flex lg:flex-col">

        <!-- Q1: SMSF Balance -->
        <div v-if="step === 'q1'" class="lg:flex-1 lg:flex lg:flex-col">
          <div class="flex flex-col gap-3 lg:flex-1">
            <button
              v-for="opt in q1Options"
              :key="opt"
              :class="optionClass(answers.q1 === opt)"
              @click="selectAndAdvance('q1', opt)"
            >
              {{ opt }}
            </button>
          </div>
        </div>

        <!-- Q2: Loan Amount -->
        <div v-else-if="step === 'q2'" class="lg:flex-1 lg:flex lg:flex-col">
          <div class="flex flex-col gap-3 lg:flex-1">
            <button
              v-for="opt in q2Options"
              :key="opt"
              :class="optionClass(answers.q2 === opt)"
              @click="selectAndAdvance('q2', opt)"
            >
              {{ opt }}
            </button>
          </div>
        </div>

        <!-- Q3: Interest Rate -->
        <LoanCheckStepQ3
          v-else-if="step === 'q3'"
          class="lg:flex-1 lg:flex lg:flex-col"
          :model-value="answers.q3"
          :option-class="optionClass"
          @select="(val) => selectAndAdvance('q3', val)"
        />

        <!-- Q4: Loan Type -->
        <div v-else-if="step === 'q4'" class="lg:flex-1 lg:flex lg:flex-col">
          <div class="flex flex-col gap-3 lg:flex-1">
            <button
              v-for="opt in q4Options"
              :key="opt"
              :class="optionClass(answers.q4 === opt)"
              @click="selectAndAdvance('q4', opt)"
            >
              {{ opt }}
            </button>
          </div>
        </div>

        <!-- Q5: Last Review -->
        <div v-else-if="step === 'q5'" class="lg:flex-1 lg:flex lg:flex-col">
          <div class="flex flex-col gap-3 lg:flex-1">
            <button
              v-for="opt in q5Options"
              :key="opt"
              :class="optionClass(answers.q5 === opt)"
              @click="selectAndAdvance('q5', opt)"
            >
              {{ opt }}
            </button>
          </div>
        </div>

        <!-- Lead Capture -->
        <div v-else-if="step === 'lead'">
          <button
            class="text-white/50 hover:text-white text-sm transition-colors flex items-center gap-1 mb-4"
            @click="goBack"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <p class="text-white font-semibold mb-4 leading-snug">{{ leadHeadline }}</p>
          <form class="space-y-3" @submit.prevent="submitLead">
            <div>
              <label for="lead-name" class="block text-sm font-medium text-white mb-1.5">First Name</label>
              <input
                id="lead-name"
                v-model="answers.name"
                type="text"
                placeholder="First Name"
                required
                class="lead-input"
              />
            </div>
            <div>
              <label for="lead-email" class="block text-sm font-medium text-white mb-1.5">Email</label>
              <input
                id="lead-email"
                v-model="answers.email"
                type="email"
                placeholder="you@email.com"
                required
                class="lead-input"
              />
            </div>
            <div>
              <label for="lead-phone" class="block text-sm font-medium text-white mb-1.5">Phone <span class="text-white/40 font-normal">(optional)</span></label>
              <input
                id="lead-phone"
                v-model="answers.phone"
                type="tel"
                placeholder="0400 000 000"
                autocomplete="tel"
                class="lead-input"
              />
            </div>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="submit-btn w-full rounded-xl py-3.5 text-sm font-semibold transition-opacity mt-2"
              :class="isSubmitting ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'"
            >
              <span v-if="isSubmitting" class="flex items-center justify-center gap-2">
                <svg class="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Submitting…
              </span>
              <span v-else>Get My Result</span>
            </button>
          </form>
          <p class="text-xs text-white/30 mt-3 leading-relaxed">
            By submitting this form you agree that WLTH may contact you by phone, SMS or email
            regarding your enquiry. Your information will be handled in accordance with our
            <a href="https://www.wlth.com/privacy" target="_blank" rel="noopener noreferrer" class="underline hover:text-white/60">Privacy Policy</a>.
          </p>
        </div>

        <!-- Result -->
        <div v-else-if="step === 'result'">

          <!-- Score card -->
          <div class="result-card rounded-2xl p-5 mb-4">
            <p class="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">Your result</p>
            <div class="flex items-end gap-3 mb-3">
              <span class="text-6xl font-bold leading-none" :class="scoreLabelColor">{{ score }}</span>
              <span class="text-white/30 text-lg mb-1">/ 100</span>
            </div>
            <div class="h-2 bg-white/10 rounded-full overflow-hidden mb-3">
              <div
                class="h-full rounded-full transition-all duration-700"
                :class="scoreBarColor"
                :style="{ width: `${score}%` }"
              />
            </div>
            <p class="font-semibold text-base" :class="scoreLabelColor">{{ scoreLabel }}</p>
          </div>

          <!-- Recommendation -->
          <div class="result-card rounded-2xl p-5 mb-4">
            <p class="text-xs font-semibold uppercase tracking-widest text-white/40 mb-2">What this means</p>
            <p class="text-white/80 leading-relaxed text-sm">
              <template v-if="score <= 60">
                Based on the information provided, your SMSF loan appears to be in a relatively
                competitive position. That said, lending conditions do change over time, so it's
                worth reviewing periodically.
              </template>
              <template v-else-if="score <= 75">
                Based on the information provided, there are some indicators your SMSF loan may
                benefit from a review. A specialist can help assess whether your current rate and
                structure remain suitable for your situation.
              </template>
              <template v-else>
                Based on the information provided, there are a number of indicators suggesting
                your SMSF loan may not be as competitive as it could be. Understanding your options
                could be worth exploring.
                <span class="block mt-3 pt-3 border-t border-white/10 text-white/50 text-xs not-italic">Even a 0.5% rate reduction on a $500k loan could save ~$2,500/year.</span>
              </template>
            </p>
          </div>

          <p class="text-xs text-white/25 text-center leading-relaxed">
            This result is indicative only and does not constitute financial advice.
          </p>
          <a href="#learn-more" class="lg:hidden flex items-center justify-center gap-1.5 mt-4 text-sm text-white/50 hover:text-white/80 transition-colors">
            Learn more about why loans become outdated
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>

      </div>
    </Transition>


  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

const isSubmitting = ref(false)

type Step = 'q1' | 'q2' | 'q3' | 'q4' | 'q5' | 'lead' | 'result'

const step = ref<Step>('q1')
const answers = reactive({
  q1: '',
  q2: '',
  q3: '',
  q4: '',
  q5: '',
  name: '',
  email: '',
  phone: '',
})

const stepOrder: Step[] = ['q1', 'q2', 'q3', 'q4', 'q5', 'lead', 'result']
const stepNumberMap: Record<string, number> = { q1: 1, q2: 2, q3: 3, q4: 4, q5: 5 }

const stepHeadings: Record<string, string> = {
  q1: 'What is the approximate balance of your SMSF?',
  q2: 'What is the approximate loan amount on your SMSF property?',
  q3: 'What is your current SMSF loan interest rate?',
  q4: 'Is your current SMSF loan fixed or variable?',
  q5: 'When was the last time your SMSF loan was reviewed?',
}
const stepHeading = computed(() => stepHeadings[step.value] ?? '')

const isQuizStep = computed(() => ['q1', 'q2', 'q3', 'q4', 'q5'].includes(step.value))
const stepNumber = computed(() => stepNumberMap[step.value] ?? 0)

// Options
const q1Options = ['$200k – $400k', '$400k – $700k', '$700k – $1M', '$1M+']
const q2Options = ['Under $300k', '$300k – $500k', '$500k – $800k', '$800k+']
const q4Options = ['Variable', 'Fixed', 'Not sure']
const q5Options = ['Within the last 12 months', '1-2 years ago', '3+ years ago', 'Never reviewed']

// Button class helper — dark variant
function optionClass(selected: boolean): string {
  const base = 'w-full lg:flex-1 py-3.5 px-3 rounded-xl border-2 font-medium text-sm transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 cursor-pointer'
  const selectedClass = 'border-royalblue-400 bg-royalblue-500/30 text-white'
  const unselectedClass = 'border-white/20 hover:border-white/40 text-white bg-white/8'
  return `${base} ${selected ? selectedClass : unselectedClass}`
}

// Navigation
function advance() {
  const idx = stepOrder.indexOf(step.value)
  if (idx < stepOrder.length - 1) {
    step.value = stepOrder[idx + 1]
  }
}

function goBack() {
  const idx = stepOrder.indexOf(step.value)
  if (idx > 0) step.value = stepOrder[idx - 1]
}

function selectAndAdvance(key: 'q1' | 'q2' | 'q3' | 'q4' | 'q5', value: string) {
  answers[key] = value
  setTimeout(() => advance(), 300)
}

// Dynamic lead copy based on Q3 answer
const rateLabel: Record<string, string> = {
  'under-5': 'under 5%',
  '5-to-6': '5%–6%',
  '6-to-7': '6%–7%',
  '7-plus': '7% or above',
}
const leadHeadline = computed(() =>
  answers.q3
    ? `Your rate of ${rateLabel[answers.q3]} may be costing you more than it should.`
    : 'Get Your SMSF Loan Health Check Result'
)

// Score computation
const score = computed<number>(() => {
  let s = 50
  if (answers.q3 === 'under-5') s += 0
  else if (answers.q3 === '5-to-6') s += 10
  else if (answers.q3 === '6-to-7') s += 20
  else if (answers.q3 === '7-plus') s += 30
  if (answers.q5 === 'Never reviewed') s += 20
  else if (answers.q5 === '3+ years ago') s += 15
  else if (answers.q5 === '1–2 years ago') s += 5
  if (answers.q4 === 'Fixed') s += 5
  return Math.min(100, Math.max(0, s))
})

const scoreLabel = computed<string>(() => {
  if (score.value <= 60) return 'Your loan appears competitive'
  if (score.value <= 75) return 'Your loan may be worth reviewing'
  return 'Your loan is likely worth reviewing urgently'
})

const scoreBarColor = computed<string>(() => {
  if (score.value <= 60) return 'bg-teal-brand'
  if (score.value <= 75) return 'bg-yellow-500'
  return 'bg-red-500'
})

const scoreLabelColor = computed<string>(() => {
  if (score.value <= 60) return 'text-teal-brand'
  if (score.value <= 75) return 'text-yellow-400'
  return 'text-red-400'
})

// HubSpot Forms v3 — set NUXT_PUBLIC_HUBSPOT_PORTAL_ID in .env
const runtimeConfig = useRuntimeConfig()
const HUBSPOT_PORTAL_ID = runtimeConfig.public.hubspotPortalId
const HUBSPOT_FORM_GUID = 'c193317f-33df-4006-b53e-cf333ea05351'

// Lead submission — posts to HubSpot Forms API then advances to result
async function submitLead() {
  if (isSubmitting.value) return
  isSubmitting.value = true

  const fields = [
    { name: 'firstname', value: answers.name },
    { name: 'email', value: answers.email },
    { name: 'mobilephone', value: answers.phone },
    { name: 'current_smsf_balance', value: answers.q1 },
    { name: 'current_loan_balance_for_refinance', value: answers.q2 },
    { name: 'interest_rate___joust', value: answers.q3 },
    { name: 'current_loan_rate_structure__typeform', value: answers.q4 },
    { name: 'last_loan_review__typeform', value: answers.q5 },
    // smsf_loan_score: property pending admin creation in HubSpot
    // { name: 'smsf_loan_score', value: String(score.value) },
  ].filter(f => f.value) // omit blank optional fields

  if (HUBSPOT_PORTAL_ID) {
    try {
      await $fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: {
            fields,
            context: {
              pageUri: window.location.href,
              pageName: document.title,
            },
          },
        }
      )
    } catch {
      // submission error — advance to result regardless
    }
  }

  isSubmitting.value = false
  advance()
}
</script>

<style scoped>
/* Step transition */
.step-enter-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.step-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.step-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.step-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* Progress bar glow */
.progress-fill {
  background: #05E6DD;
  box-shadow: 0 0 8px rgba(5, 230, 221, 0.4);
}

/* Teal brand colour utilities */
.text-teal-brand { color: #05E6DD; }
.bg-teal-brand { background: #05E6DD; }

/* Result cards */
.result-card {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

/* Lead form inputs */
.lead-input {
  width: 100%;
  background: rgba(255, 255, 255, 0.08);
  border: 1.5px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  color: #ffffff;
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.15s ease, background 0.15s ease;
}
.lead-input::placeholder {
  color: rgba(255, 255, 255, 0.35);
}
.lead-input:focus {
  border-color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.12);
}

/* Submit button */
.submit-btn {
  background: #05E6DD;
  color: #0A2364;
}
.submit-btn:not(:disabled):hover {
  background: #04cfc7;
}
</style>
