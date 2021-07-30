<template>
 <div>
  <header class="bg-gray-500 rounded-md text-white w-2/4 mx-auto">
   <h1 class="text-6xl text-center font-serif mb-12">Sticky Scrum Board</h1>
  </header>
  <div class="grid grid-cols-3 mx-6">
   <div class="px-4" v-for="(item, index) in state.board.columns" :key="index">
    <div
     class="h-full py-6 border-1 border-gray-100 shadow-md rounded-sm"
     :class="item.theme.boardBg"
    >
     <h1 class="pb-2 text-3xl font-bold">{{ item.name }}</h1>
     <div v-if="item.sticky">
      <sticky :sticky="sticky" />
     </div>
     <div v-else>
      <p>No stickies added to the board yet!</p>
      <button
       class="px-4 py-2 mt-4 shadow-md rounded-md"
       :class="item.theme.buttonBg"
      >
       Add Sticky
      </button>
     </div>
    </div>
   </div>
  </div>
 </div>
</template>


<script>
export default {
 data() {
  return {
    sticky: null
  };
 },
};
</script>


<style></style>
