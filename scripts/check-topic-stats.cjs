const {load}=require('./load-ts.cjs');const assert=require('node:assert/strict');
const {buildTopicStats}=load('lib/topicStats.ts');
const questions=[{id:'a',topic:'Addition',correctAnswer:'1,211',marking:{kind:'numeric'}},{id:'b',topic:'Addition',correctAnswer:'1,245',marking:{kind:'numeric'}}];
const result={questions,userAnswers:{a:'1211.0',b:'2490/2'},quizType:'fill-in-the-blank'};
assert.deepEqual(buildTopicStats(result),[{topic:'Addition',correct:2,total:2,pct:100}]);
assert.deepEqual(buildTopicStats({...result,userAnswers:{a:'1211.0',b:'1245cm'}}),[{topic:'Addition',correct:1,total:2,pct:50}]);
assert.deepEqual(buildTopicStats({...result,userAnswers:{}}),[{topic:'Addition',correct:0,total:2,pct:0}]);
assert.deepEqual(buildTopicStats({...result,quizType:'multiple-choice'}),[{topic:'Addition',correct:0,total:2,pct:0}]);
console.log('PASS: topic breakdown uses the same format/unit-aware scoring as quiz and review.');
