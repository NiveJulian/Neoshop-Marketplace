function mayuscName(name) {
    let words = name.split(' ');

    let finalsName = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });

    return finalsName.join(' ').trim();
}

module.exports = mayuscName;