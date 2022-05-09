const storageManager = new StorageManager('todo_version_jquery');

for (let id in storageManager.getData()[0]) {
    addElement(0, id, storageManager.getEntry(0, id).text);
}


$('#todo_list_form').on('submit', function (event) {
    event.preventDefault();
    const input = $(this).find('input');
    const value = input.val();

    const id = storageManager.add(0, value);
    addElement(0, id, value);

    input.val('');
});

function addElement(parent_id, id, value) {
    const delete_btn = $('<a href="#" class="delete_btn">x</a>')
        .on('click', function(event) {
            event.preventDefault();
            const item = $(this).parent();
            console.log(item.data());
            item.remove();
        });
    const item = $('<li></li>')
        .text(value)
        .append(delete_btn)
        .data({id: id, parent_id: parent_id});
    $('.todo_list').append(item);
}