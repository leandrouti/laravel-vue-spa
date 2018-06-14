<template>
    <div class="container">
        <div class="columns">
            <div class="column">
                <div class="message" v-for="status in statuses">
                    <div class="message-header">
                        <p>{{ status.user.name }} said...</p>
                        <p>{{ status.created_at | ago | capitalize }}</p>
                    </div>

                    <div class="message-body" v-text="status.body"></div>
                </div>

                <!-- add to stream -->
                <AddToStream @completed="addStatus"></AddToStream>
            </div>
        </div>
    </div>
</template>

<script>
    
    import Moment from 'moment';
    import Status from '../models/Status';
    import AddToStream from '../components/AddToStream';
    export default {
        components : {
            AddToStream,
        },

        data(){
            return {
                statuses : []
            }
        },
        
        created(){
            
                Status.all().then(({data}) => this.statuses = data);
                // OR .then(response => this.statuses = response.data);
        },
        filters : {
            ago(date){
                //Moment.locale('ja');
                return Moment(date).fromNow();
            },
            capitalize(value){
                return value.toUpperCase();
            }
        },

        methods : {
            addStatus(data){
                this.statuses.unshift(data);
                alert ('Your status has been added to the stream.');
                window.scroll(0,0);
            }
        }
        
    }
</script>
