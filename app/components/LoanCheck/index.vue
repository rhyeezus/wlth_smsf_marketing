<template>
  <div class="flex flex-col lg:min-h-[28rem]">

    <Transition name="step" mode="out-in">
      <div :key="step">

        <!-- Q1: SMSF Balance -->
        <div v-if="step === 'q1'">
          <h3 class="text-xl font-semibold text-white mb-2 font-sans">
            What is the approximate balance of your SMSF?
          </h3>
          <p class="text-white/70 text-sm mb-6">Select the range that best applies.</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
        <div v-else-if="step === 'q2'">
          <h3 class="text-xl font-semibold text-white mb-2 font-sans">
            What is the approximate loan amount on your SMSF property?
          </h3>
          <p class="text-white/70 text-sm mb-6">Select the range that best applies.</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
          :model-value="answers.q3"
          :option-class="optionClass"
          @select="(val) => selectAndAdvance('q3', val)"
        />

        <!-- Q4: Loan Type -->
        <div v-else-if="step === 'q4'">
          <h3 class="text-xl font-semibold text-white mb-2 font-sans">
            Is your current SMSF loan fixed or variable?
          </h3>
          <p class="text-white/70 text-sm mb-6">Select the option that applies.</p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
        <div v-else-if="step === 'q5'">
          <h3 class="text-xl font-semibold text-white mb-2 font-sans">
            When was the last time your SMSF loan was reviewed?
          </h3>
          <p class="text-white/70 text-sm mb-6">Select the option that best applies.</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
          <p class="text-white font-semibold mb-4 leading-snug">{{ leadHeadline }}</p>
          <form class="space-y-3" @submit.prevent="submitLead">
            <div>
              <label class="block text-sm font-medium text-white mb-1.5">First Name</label>
              <UInput
                v-model="answers.name"
                placeholder="First Name"
                size="lg"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-white mb-1.5">Email</label>
              <UInput
                v-model="answers.email"
                type="email"
                placeholder="your@email.com"
                size="lg"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-white mb-1.5">Phone Number <span class="text-white/40 font-normal">(optional)</span></label>
              <UInput
                v-model="answers.phone"
                type="tel"
                placeholder="04xx xxx xxx"
                size="lg"
              />
            </div>
            <UButton
              type="submit"
              color="primary"
              size="xl"
              block
              class="mt-2"
            >
              Get My Result
            </UButton>
          </form>
          <p class="text-xs text-white/30 mt-3 leading-relaxed">
            By submitting this form you agree that WLTH may contact you by phone, SMS or email
            regarding your enquiry. Your information will be handled in accordance with our
            <a href="#" class="underline hover:text-white/60">Privacy Policy</a>.
          </p>
        </div>

        <!-- Result -->
        <div v-else-if="step === 'result'">
          <h3 class="text-2xl font-bold text-white mb-6 font-sans">
            Your SMSF Loan Health Check Result
          </h3>

          <!-- Score meter -->
          <div class="mb-8">
            <div class="flex items-end gap-2 mb-3">
              <span class="text-7xl font-bold leading-none" :class="scoreLabelColor">{{ score }}</span>
              <span class="text-white/50 text-xl mb-2">/ 100</span>
            </div>
            <div class="h-3 bg-white/20 rounded-full overflow-hidden mb-3">
              <div
                class="progress-fill h-full rounded-full transition-all duration-700"
                :class="scoreBarColor"
                :style="{ width: `${score}%` }"
              />
            </div>
            <p class="font-semibold text-lg" :class="scoreLabelColor">{{ scoreLabel }}</p>
          </div>

          <!-- Recommendation -->
          <div class="bg-white/10 rounded-xl p-5 mb-6">
            <p class="text-white/80 leading-relaxed text-sm">
              <template v-if="score <= 40">
                Based on the information provided, your SMSF loan appears to be in a relatively
                competitive position. That said, lending conditions do change over time, so it's
                always worth keeping an eye on the market.
              </template>
              <template v-else-if="score <= 70">
                Based on the information provided, there are some indicators that your SMSF loan
                may benefit from a review. A specialist can help assess whether your current
                loan structure and rate remain suitable for your situation.
              </template>
              <template v-else>
                Based on the information provided, there are a number of indicators suggesting
                your SMSF loan may not be as competitive as it could be. Speaking with a specialist
                could help you understand your options and whether any changes may be beneficial.
                <em class="block mt-2 text-white/50 text-xs not-italic">Even a 0.5% rate reduction on a $500k loan could save you ~$2,500/year.</em>
              </template>
            </p>
          </div>

          <UButton
            color="primary"
            size="xl"
            block
            to="https://wlth.com/smsf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Speak With a SMSF Loan Specialist
          </UButton>

          <p class="text-xs text-white/30 mt-4 text-center leading-relaxed">
            This result is indicative only and does not constitute financial advice.
          </p>
        </div>

      </div>
    </Transition>

    <!-- Progress bar — pinned to bottom; mt-auto fills remaining space when card is fixed min-height -->
    <div v-if="isQuizStep" class="mt-auto pt-8">
      <div class="flex justify-between text-sm text-white/60 mb-2">
        <span>Step {{ stepNumber }} of 5</span>
        <span>{{ Math.round((stepNumber / 5) * 100) }}%</span>
      </div>
      <div class="h-3 bg-white/20 rounded-full overflow-hidden">
        <div
          class="progress-fill h-full bg-royalblue-500 rounded-full transition-all duration-500"
          :style="{ width: `${(stepNumber / 5) * 100}%` }"
        />
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

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

const isQuizStep = computed(() => ['q1', 'q2', 'q3', 'q4', 'q5'].includes(step.value))
const stepNumber = computed(() => stepNumberMap[step.value] ?? 0)

// Options
const q1Options = ['$200k – $400k', '$400k – $700k', '$700k – $1M', '$1M+']
const q2Options = ['Under $300k', '$300k – $500k', '$500k – $800k', '$800k+']
const q4Options = ['Variable', 'Fixed', 'Not sure']
const q5Options = ['Within the last 12 months', '1–2 years ago', '3+ years ago', 'Never reviewed']

// Button class helper — dark variant
function optionClass(selected: boolean): string {
  const base = 'w-full py-3.5 px-3 rounded-xl border-2 font-medium text-sm transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 cursor-pointer'
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
const leadSub = computed(() =>
  answers.q3
    ? 'Enter your details and a WLTH specialist will show you exactly where you stand — and what a better rate could look like.'
    : 'Based on the information you entered, your SMSF loan may be worth reviewing with a specialist. Enter your details to receive your result summary.'
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
  if (score.value <= 40) return 'Your loan appears competitive'
  if (score.value <= 70) return 'Your loan may be worth reviewing'
  return 'Your loan is likely worth reviewing urgently'
})

const scoreBarColor = computed<string>(() => {
  if (score.value <= 40) return 'bg-green-500'
  if (score.value <= 70) return 'bg-yellow-500'
  return 'bg-red-500'
})

const scoreLabelColor = computed<string>(() => {
  if (score.value <= 40) return 'text-green-400'
  if (score.value <= 70) return 'text-yellow-400'
  return 'text-red-400'
})

// HubSpot Forms v3 — set NUXT_PUBLIC_HUBSPOT_PORTAL_ID in .env
const runtimeConfig = useRuntimeConfig()
const HUBSPOT_PORTAL_ID = runtimeConfig.public.hubspotPortalId
const HUBSPOT_FORM_GUID = 'f9d08ba6-c47e-4909-9b1e-bc4d461fda9c'

// Lead submission — posts to HubSpot Forms API then advances to result
async function submitLead() {
  const fields = [
    { name: 'firstname', value: answers.name },
    { name: 'email', value: answers.email },
    { name: 'mobilephone', value: answers.phone },
    { name: 'current_smsf_balance', value: answers.q1 },
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
    } catch (err) {
      console.error('HubSpot submission error:', err)
    }
  } else {
    console.warn('NUXT_PUBLIC_HUBSPOT_PORTAL_ID not set — skipping HubSpot submission')
    console.log('Lead payload:', { fields })
  }

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
  box-shadow: 0 0 8px rgba(5, 230, 221, 0.4);
}
</style>
