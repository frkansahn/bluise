<template>
	<table class="table" :id="id">
		<thead class="table-secondary">
			<tr>
				<th v-for="(H,index) in head" :key="`head${index}`">{{H}}</th>
			</tr>
		</thead>
		<tbody class="table-light">
			<tr v-for="(B,index) in body" :key="`body${index}`">
				<td>{{B.id}}</td>
				<td>{{B.createdAt | dateFormat}}</td>
				<td>{{B.deed_district}}/{{B.neighborhood}}</td>
				<td>{{B.status | appStatus}}</td>
				<td>
					<NuxtLink :to="`/application/edit/${B.id}`" id="applicationEdit" class="btn btn-sm btn-outline-primary px-4">
	                  	Gör
	               </NuxtLink>
				</td>
			</tr>
		</tbody>
	</table>
</template>
<script>
	export default{
		name:'Tablo',
		props:["body" , "head" , "id"],
	    components:{
	    },
	    data() {
	        return {
	        }
	    },
	    methods:{

	    },
	    created(){			
		}
	}
</script>

<style>
</style>
