const setTimestamp = (schema) => {
    schema.add({
        created: Date,
        modified: Date
    });

    schema.pre('save', function (next) {
        const now = Date.now();

        this.modified = now;

        if (!this.created) {
            this.created = now
        }
        next()
    });
};

module.exports = setTimestamp;