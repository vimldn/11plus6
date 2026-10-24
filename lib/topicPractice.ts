import { createFreshMaths, freshTopics, freshTopicLabels, FreshTopic } from '../data/freshMaths';

export function createTopicPractice(topic?: string, random: () => number = Math.random) {
  if (!topic) return { questions: createFreshMaths(random), notice: 'Original calculated maths practice. Supported variations are checked by independent calculations.' };
  if (!freshTopics.includes(topic as FreshTopic)) return { questions: [], notice: 'This topic is not available. Return to the practice library and choose a supported skill.' };
  return { questions: createFreshMaths(random, [topic as FreshTopic], 10), notice: `Original ${freshTopicLabels[topic as FreshTopic]} practice: 10 calculated questions on this skill. Repeats are possible across attempts.` };
}
