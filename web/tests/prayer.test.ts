import assert from 'node:assert/strict';
import test from 'node:test';
import { calculatePrayerTimes, lagosDateKey, nextDateKey, getNextPrayer } from '../src/lib/prayer';

for (const timezone of ['UTC', 'America/Los_Angeles', 'Asia/Tokyo']) {
 test(`Lagos date rollover and a full year of prayer countdowns in ${timezone}`, () => {
 const originalTimezone = process.env.TZ;
 process.env.TZ = timezone;
 try {
assert.equal(lagosDateKey(Date.parse('2026-10-14T22:59:59Z')), '2026-10-14');
assert.equal(lagosDateKey(Date.parse('2026-10-14T23:00:00Z')), '2026-10-15');
assert.equal(nextDateKey('2026-12-31'),'2027-01-01');assert.equal(nextDateKey('2028-02-28'),'2028-02-29');assert.equal(nextDateKey('2028-02-29'),'2028-03-01');
let previous='';let changed=0;
for(let i=0;i<365;i++){
 const key=new Date(Date.UTC(2026,0,1+i)).toISOString().slice(0,10);const slots=calculatePrayerTimes(key);
 assert.equal(slots.length,6);assert.deepEqual(slots.map(s=>s.key),['fajr','sunrise','dhuhr','asr','maghrib','isha']);
 for(let j=0;j<slots.length;j++){assert.ok(Number.isFinite(slots[j].at));assert.equal(lagosDateKey(slots[j].at),key);if(j)assert.ok(slots[j].at>slots[j-1].at);}
 const tomorrow=calculatePrayerTimes(nextDateKey(key));const afterIsha=slots[5].at+1000;const next=getNextPrayer(slots,tomorrow,afterIsha);
 assert.equal(next.slot.key,'fajr');assert.equal(next.slot.at,tomorrow[0].at);assert.ok(next.isTomorrow);assert.equal(next.msUntil,tomorrow[0].at-afterIsha);
 const beforeFajr=getNextPrayer(slots,tomorrow,slots[0].at-1000);assert.equal(beforeFajr.msUntil,1000);assert.equal(beforeFajr.slot.key,'fajr');assert.equal(beforeFajr.isTomorrow,false);
 const atFajr=getNextPrayer(slots,tomorrow,slots[0].at);assert.equal(atFajr.slot.key,'dhuhr');
 if(previous&&previous!==slots[0].time)changed++;previous=slots[0].time;
}
assert.ok(changed>40);const sample=calculatePrayerTimes('2026-10-14');
assert.deepEqual(sample.map(s=>s.at), [1791951780000,1791955980000,1791977580000,1791989400000,1791999120000,1792003080000]);
 } finally { if (originalTimezone === undefined) delete process.env.TZ; else process.env.TZ = originalTimezone; }
 });
}
