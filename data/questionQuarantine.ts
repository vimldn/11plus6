// Confirmed or ambiguous items found in the 20 October diagnostic sample.
// Keep source records for review; exclude every derived form of each family.
export const quarantinedFamilies = new Set([
  'math-038', // 240 × 1.18 = 283.2; whole items and no rounding instruction.
  'math-164', // Key contradicts explanation: 750g pack is better value.
  'math-189', // Whole packs of each can total 20; LCM needs equal totals per size.
  'math-226', // 19 − 2 = 17, absent from choices; key says 15.
  'math-232', // 50° might be apex or base angle, giving different pairs.
  'math-236', // Squared number can be 5 or −5; positivity not specified.
  'math-242', // Sorted seven values cannot have the stated mean; key contradicts task.
  'math-080', // n²=81 permits -9 too; positivity unspecified.
  'eng-064', // Several ellipsis options can be valid in context.
  'eng-087', // Rhetorical intent requires context.
  'eng-096', // Several plausible causes of barely eating; no deciding context.
  'eng-133', // More than one standard-English option.
  'vr-077', // CLOTH does not complete SUN/FOOT/TABLE as claimed.
  'vr-105', // Monday day 1 makes day 18 Thursday, not Friday.
  'vr-121', // Ring does not complete both supplied sentences.
  'vr-124', // Pack does not complete "played his pack card".
  'vr-125', // ROCK and MUD both give compounds; not uniquely keyed.
  'vr-129', // No books-versus-pens price relationship is given.
  'vr-136', // STEIN cannot be rearranged into the claimed drink.
  'vr-138', // Derived free text keys "All of these" without options.
  'vr-150', // CUP does not form CUPFLY.
  'vr-154', // ANT is not a contiguous hidden word in PLANET; NET is.
  'vr-160', // MARTIAL does not contain MARS.
  'vr-162', // Both verbose/wordy and concise/brief are synonym pairs.
  'vr-166', // Pride, murder and flock are all collective nouns.
  'nvr-006', // Equivalent cross/plus options and unspecified layout rule.
  'nvr-011', // Symmetry premise conflicts with listed shapes.
  'nvr-016', // Both prism and pyramid lack circular cross-sections.
  'nvr-026', // Opposite equal angles do not determine a rhombus.
  'nvr-040', // Lowercase turned r is not a rotated capital R.
  'nvr-047', // Net diagrams absent; shape names do not specify nets.
  'nvr-048', // Missing cube-net diagram.
  'nvr-056', // Set of shapes not supplied.
  'nvr-072', // Hole position must exclude folds/edges for four holes.
  'nvr-075', // Cut geometry unspecified; answer not determined.
  'nvr-086', // Starting colour omitted.
  'nvr-088', // Starting inside/outside state omitted.
]);
const quarantinedIds = new Set([
  'math-mc-172', // 1/3 and 4/12 both correct.
  'math-mc-177', // 4/8 and 1/2 both correct.
  'math-mc-217', // Duplicate spinner question, same equivalent correct options.
  'math-mc-224', // 6/20 and 3/10 both correct.
  'math-mc-240', // 1/6 and 6/36 both correct.
  'math-mc-247', // Duplicate spinner question, same equivalent correct options.
  'math-mc-018', // Live check: 6/12, 1/2 and 2/4 are equivalent correct options.
  'eng-fitb-037', // Free-text passive-voice task lacks candidate sentences.
  'eng-fitb-049', // Unrestricted modal-verb prompt has many answers.
  'eng-fitb-059', // Free-text semicolon task lacks candidate sentences.
  'eng-fitb-068', // Free-text spelling task has no word/candidates.
  'eng-fitb-074', // Free-text spelling task has no word/candidates.
  'eng-fitb-102', // Unrestricted compound-sentence prompt.
  'eng-fitb-104', // Free-text fronted-adverbial task lacks candidates.
  'eng-fitb-109', // Unrestricted exclamation sentence prompt.
  'eng-fitb-035', // Free-text grammar task lacks candidate sentences.
  'eng-fitb-038', // Unrestricted conjunction prompt.
]);
export function isQuestionQuarantined(id: string): boolean {
  const match = /^(math|eng|vr|nvr)-(?:mc|tf|fitb)-(\d+)$/.exec(id);
  return quarantinedIds.has(id) || Boolean(match && quarantinedFamilies.has(`${match[1]}-${match[2]}`));
}
