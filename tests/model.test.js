const assert=require('node:assert/strict');
const m=require('../docs/model.js');
const currents={11:1.2,12:1,21:.9,22:.9,31:.8,32:.7,41:.6,42:.5,51:.4,52:.3};
const cables={Rc1:.4,Rc2:.3,Rc3:.2,Rc4:.1,Rc5:.1};
const cal=m.dimension({VA:24,VB:20,...cables,currents});
const expectedV={1:21.8,2:20.81,3:20.51,4:19.82,5:19.75};
const expectedI={1:5.5,2:3.3,3:1.5,4:1.8,5:.7};
for(const node of m.NODES){assert.ok(Math.abs(cal.voltages[node]-expectedV[node])<1e-10);assert.ok(Math.abs(cal.trunks[node]-expectedI[node])<1e-10)}
for(const id of m.IDS)assert.ok(Math.abs(cal.fixed[id]*currents[id]-cal.voltages[id[0]])<1e-10);
const changed=m.dimension({VA:24,VB:22,...cables,currents});
for(const id of ['11','12','21','22','31','32'])assert.equal(changed.fixed[id],cal.fixed[id]);
for(const id of ['41','42','51','52'])assert.notEqual(changed.fixed[id],cal.fixed[id]);
const zero=Object.fromEntries(m.IDS.map(id=>[id,0]));
const op=m.simulate({V:24,...cables,fixed:cal.fixed,rheostats:zero});
for(const node of m.NODES){assert.ok(Math.abs(op.trunks[node]-op.currents[node+'1']-op.currents[node+'2']-(node<5?op.trunks[node+1]:0))<1e-10);const prev=node===1?op.V:op.voltages[node-1];assert.ok(Math.abs(prev-op.voltages[node]-op.trunks[node]*cables['Rc'+node])<1e-10)}
assert.ok(Math.abs(op.pError)<1e-10);
const targets=Object.fromEntries(m.IDS.map(id=>[id,.3]));
const adj=m.adjust({...cables,fixed:cal.fixed,targets,maxReo:100});assert.equal(adj.feasible,true);assert.ok(adj.zero.length);
const adjusted=m.simulate({V:adj.V,...cables,fixed:cal.fixed,rheostats:adj.rheostats});
for(const id of m.IDS)assert.ok(Math.abs(adjusted.currents[id]-targets[id])<1e-10);
assert.equal(m.adjust({...cables,fixed:cal.fixed,targets,maxReo:.001}).feasible,false);
for(const [VA,VB,side] of [[1,20,'A'],[24,.1,'B']])assert.throws(()=>m.dimension({VA,VB,...cables,currents}),e=>e.message==='voltage-exhausted'&&e.side===side);
assert.throws(()=>m.dimension({VA:24,VB:20,...cables,currents:{...currents,11:0}}),/invalid-input/);
console.log('Modelo 3 + 2 y regulación de cinco nodos: correcto');
