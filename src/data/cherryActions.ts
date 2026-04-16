export interface CherryAction {
  id:      string;
  phrase:  string;
  action:  string;
}

export const CHERRY_ACTIONS: CherryAction[] = [
  {
    id:     'ca_01',
    phrase: 'Start clean — even a small reset in your space can quietly shift how everything feels and flows',
    action: 'Clear your workspace for 5 minutes',
  },
  {
    id:     'ca_02',
    phrase: 'What you name, you can move — once it\'s out of your head, it already feels lighter and more manageable',
    action: 'Write down 3 things you\'ve been delaying',
  },
  {
    id:     'ca_03',
    phrase: 'Movement wakes more than muscles — it resets your rhythm and brings you back into motion',
    action: 'Do 10 push-ups or a quick stretch',
  },
  {
    id:     'ca_04',
    phrase: 'Starting is the only hard part — once you\'re in, even a few minutes can turn into real progress',
    action: 'Open one task and work on it for 5 minutes',
  },
  {
    id:     'ca_05',
    phrase: 'Small resets change the pace — sometimes the simplest action is enough to regain control',
    action: 'Drink a glass of water slowly',
  },
  {
    id:     'ca_06',
    phrase: 'Done is lighter than pending — clarity always feels better than silent delays',
    action: 'Send one message you\'ve been postponing',
  },
  {
    id:     'ca_07',
    phrase: 'A short pause can shift everything — a different space often brings a different state',
    action: 'Step outside for fresh air (3–5 min)',
  },
  {
    id:     'ca_08',
    phrase: 'Order outside builds order inside — structure around you reflects back into your focus',
    action: 'Organize one small area (desk, bag, folder)',
  },
  {
    id:     'ca_09',
    phrase: 'One line can unlock the rest — you don\'t need perfection to begin, just a starting point',
    action: 'Write one simple idea or thought',
  },
  {
    id:     'ca_10',
    phrase: 'Focus is a decision, not a condition — remove the noise and the direction becomes obvious',
    action: 'Turn off distractions for 10 minutes',
  },
  {
    id:     'ca_11',
    phrase: 'One completed action at the start sets the tone — momentum often begins with something simple and visible',
    action: 'Make your bed or reset one visible spot',
  },
  {
    id:     'ca_12',
    phrase: 'Not everything deserves your time — clarity grows when you choose what to ignore',
    action: 'Review your to-do list and remove one unnecessary task',
  },
  {
    id:     'ca_13',
    phrase: 'Even a small input can shift your direction — progress often starts with a single idea',
    action: 'Read 2–3 pages of anything useful',
  },
  {
    id:     'ca_14',
    phrase: 'The cleaner your view, the clearer your next step — noise hides what actually matters',
    action: 'Clean your phone screen or desktop icons',
  },
  {
    id:     'ca_15',
    phrase: 'Slowing down for a moment can realign everything — pace is something you control',
    action: 'Stand still and take 5 slow breaths',
  },
  {
    id:     'ca_16',
    phrase: 'Direction doesn\'t need to be perfect — it just needs to exist',
    action: 'Write one thing you want to improve today',
  },
  {
    id:     'ca_17',
    phrase: 'Small closures create space — every finished detail frees your attention',
    action: 'Fix one small unfinished thing',
  },
  {
    id:     'ca_18',
    phrase: 'Order builds quietly — one action at a time is enough',
    action: 'Put away something that\'s out of place',
  },
  {
    id:     'ca_19',
    phrase: 'Facing it reduces the weight — avoidance grows faster than the task itself',
    action: 'Open something you\'ve been avoiding and look at it for 2 minutes',
  },
  {
    id:     'ca_20',
    phrase: 'A clear direction makes everything easier — even a short window can be used with purpose',
    action: 'Set a simple intention for the next hour',
  },
  {
    id:     'ca_21',
    phrase: 'Letting go creates space — not everything needs to stay to be valuable',
    action: 'Delete 10 unnecessary photos or files',
  },
  {
    id:     'ca_22',
    phrase: 'Small physical shifts can reset your state — how you sit affects how you think',
    action: 'Adjust your sitting position or posture',
  },
  {
    id:     'ca_23',
    phrase: 'Precision sharpens results — even small refinements make a difference',
    action: 'Check one detail in something you\'ve already done',
  },
  {
    id:     'ca_24',
    phrase: 'Fewer open things mean clearer focus — reduce the noise, keep the signal',
    action: 'Close all unused tabs or apps',
  },
  {
    id:     'ca_25',
    phrase: 'Not everything is urgent — but something always is',
    action: 'Write down one thing that actually matters right now',
  },
  {
    id:     'ca_26',
    phrase: 'Growth doesn\'t need hours — consistency builds it quietly',
    action: 'Spend 5 minutes learning something new',
  },
  {
    id:     'ca_27',
    phrase: 'Improvement starts where you are — no need to wait for the perfect moment',
    action: 'Look at your surroundings and fix one small detail',
  },
  {
    id:     'ca_28',
    phrase: 'Direction matters more than speed — a quick check can save time later',
    action: 'Pause and rethink your current task',
  },
  {
    id:     'ca_29',
    phrase: 'Slowing down can increase control — not everything needs to be rushed',
    action: 'Do one thing slower than usual',
  },
  {
    id:     'ca_30',
    phrase: 'Completion brings clarity — unfinished things drain more than they should',
    action: 'Finish something you already started',
  },
  {
    id:     'ca_31',
    phrase: 'Structure reduces friction — when things are clear, moving forward feels easier',
    action: 'Rename and organize one file or folder',
  },
  {
    id:     'ca_32',
    phrase: 'A cleaner space resets your perception — even small changes affect how you continue',
    action: 'Wipe one surface (desk, table, screen)',
  },
  {
    id:     'ca_33',
    phrase: 'Limits create intensity — short focus often beats long distraction',
    action: 'Set a timer for 5 minutes and focus on one thing only',
  },
  {
    id:     'ca_34',
    phrase: 'Returning is easier than restarting — progress is often just one step away',
    action: 'Reopen something you left unfinished and continue it briefly',
  },
  {
    id:     'ca_35',
    phrase: 'What you remove matters as much as what you add — clarity is built by subtraction',
    action: 'Remove one distraction from your environment',
  },
  {
    id:     'ca_36',
    phrase: 'Indecision drains more energy than action — clarity begins with a choice',
    action: 'Write down one decision and commit to it',
  },
  {
    id:     'ca_37',
    phrase: 'Time isn\'t found — it\'s made through small adjustments',
    action: 'Check your schedule and free up 10 minutes',
  },
  {
    id:     'ca_38',
    phrase: 'Staying on one path builds strength — scattered effort slows everything down',
    action: 'Do one simple task without switching to anything else',
  },
  {
    id:     'ca_39',
    phrase: 'Movement resets perspective — sometimes a few steps change the whole view',
    action: 'Take a short walk inside or outside',
  },
  {
    id:     'ca_40',
    phrase: 'Noticing progress fuels more of it — even small wins matter',
    action: 'Pause and look at what you\'ve already done today',
  },
];