export default {
  props:{
    repositories:{
      type:Array,
      required:true,
    },
  },

  methods:{
    sortRepositories(sorting){
      this.repositories.sort((a, b) => {
        if(a[sorting.name] > b[sorting.name]){
          return sorting.type === 'asc' ? 1 : -1;
        }
        else if(a[sorting.name] === b[sorting.name])
          return 0;
        else return sorting.type === 'asc' ? -1 : 1;
      });
    }
  }
};
