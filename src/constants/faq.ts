export type FaqItem = {
  id: number;
  category: string;
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    id: 1,
    category: 'getting started',
    question: 'how do i set up my first app limit?',
    answer:
      'go to the limits tab, tap "select apps", choose the apps you want to limit, set your desired time limits, and select an accountability partner who will approve extension requests.',
  },
  {
    id: 2,
    category: 'getting started',
    question: 'what is an accountability partner?',
    answer:
      'an accountability partner is a friend who helps you stick to your screen time goals. they can approve or deny your requests for additional time when you reach your daily limit.',
  },
  {
    id: 3,
    category: 'limits & time',
    question: 'can i set different limits for different days?',
    answer:
      'yes! when setting up an app limit, toggle off "same limit for all days" to customize time limits for each day of the week.',
  },
  {
    id: 4,
    category: 'limits & time',
    question: 'what happens when i run out of time?',
    answer:
      'when your daily limit is reached, the app will be blocked. you can request additional time from your accountability partner, who will receive a notification to approve or deny your request.',
  },
  {
    id: 5,
    category: 'requests & tokens',
    question: 'how do extension requests work?',
    answer:
      "when you need more time, tap the app and send a request to your accountability partner with a reason. they'll receive a notification and can approve or deny it through the chat.",
  },
  {
    id: 6,
    category: 'requests & tokens',
    question: 'what are emergency tokens?',
    answer:
      'emergency tokens allow you to instantly grant yourself additional time without waiting for approval. use them wisely as they are limited and meant for genuine emergencies only.',
  },
  {
    id: 7,
    category: 'downtime & quiet hours',
    question: 'can i allow certain apps during downtime?',
    answer:
      'yes! when setting up downtime, choose "allow" mode and select which apps should remain accessible during your quiet hours.',
  },
  {
    id: 8,
    category: 'downtime & quiet hours',
    question: 'how does downtime work?',
    answer:
      'downtime blocks apps during specific hours (like bedtime) regardless of your remaining daily limit. you can set different downtime schedules for each day.',
  },
  {
    id: 9,
    category: 'account & settings',
    question: 'how do i change my accountability partner?',
    answer:
      'go to settings > choose mode, where you can modify your accountability partners for each app or change your overall accountability settings.',
  },
  {
    id: 10,
    category: 'account & settings',
    question: 'can i temporarily pause all limits?',
    answer:
      'you can request approval from your accountability partner to modify or pause limits. this ensures you stay accountable to your goals while maintaining flexibility when needed.',
  },
];

