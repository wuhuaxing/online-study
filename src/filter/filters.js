import Vue from 'vue'
import pool from './pool.js'

for (let obj in pool) {
	Vue.filter(obj, pool[obj])
}