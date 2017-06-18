var vm1 = new Vue({
    el:'#app',
    data: {
        message: 'hello world',
        todo: null,
        editTodo:null,
        todos:[],
    },
    methods: {
        add:function(){
            if(this.todo != null) {
                this.todos.push({
                    content:this.todo,
                    finished:false,
                    isEdited:false,
                });
            }
            this.todo = null;
        },
        remove:function(ele){
            this.todos = this.todos.filter(item => item !== ele);
        },
        edit:function(ele){
            this.editTodo = ele.content;
            ele.isEdited = true;
        },
        update:function(ele) {
            if(!this.editTodoIsValid){
                console.log('editTodo is empty');
                return;
            }
            console.log('editTodo is inempty');
            ele.content = this.editTodo;
            ele.isEdited = false;
        },
    },
    computed: {
        editTodoIsValid:function(){
            return !!this.editTodo;
        },

        isBeingEdited:function(){//is there any order is being edited
            return this.todos.filter(todo => todo.isEdited).length > 0;
        },

    }
});