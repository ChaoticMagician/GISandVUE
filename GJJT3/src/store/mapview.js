const state={
    newview: true
}
const mutations = {
    set_newview(state,v){
        state.newview = !state.newview
    }
}
export default {
    state,mutations
}