function isPromiseLike(object) {
    return object != null && typeof object.then === 'function';
}
const defaultOnRejectedFn = (reason) => {
    throw reason;
};
export class ValueOrPromise {
    constructor(executor) {
        let value;
        try {
            value = executor();
        }
        catch (reason) {
            this.state = { status: 'rejected', value: reason };
            return;
        }
        if (isPromiseLike(value)) {
            this.state = { status: 'pending', value };
            return;
        }
        this.state = { status: 'fulfilled', value };
    }
    then(onFulfilled, onRejected) {
        const state = this.state;
        if (state.status === 'pending') {
            return new ValueOrPromise(() => state.value.then(onFulfilled, onRejected));
        }
        const onRejectedFn = typeof onRejected === 'function' ? onRejected : defaultOnRejectedFn;
        if (state.status === 'rejected') {
            return new ValueOrPromise(() => onRejectedFn(state.value));
        }
        try {
            const onFulfilledFn = typeof onFulfilled === 'function' ? onFulfilled : undefined;
            return onFulfilledFn === undefined
                ? new ValueOrPromise(() => state.value)
                : new ValueOrPromise(() => onFulfilledFn(state.value));
        }
        catch (e) {
            return new ValueOrPromise(() => onRejectedFn(e));
        }
    }
    catch(onRejected) {
        return this.then(undefined, onRejected);
    }
    resolve() {
        const state = this.state;
        if (state.status === 'pending') {
            return state.value;
        }
        if (state.status === 'rejected') {
            throw state.value;
        }
        return state.value;
    }
    static all(valueOrPromises) {
        const values = [];
        for (let i = 0; i < valueOrPromises.length; i++) {
            const valueOrPromise = valueOrPromises[i];
            const state = valueOrPromise.state;
            if (state.status === 'rejected') {
                return new ValueOrPromise(() => {
                    throw state.value;
                });
            }
            if (state.status === 'pending') {
                return new ValueOrPromise(() => Promise.all(valueOrPromises.slice(i)).then((resolvedPromises) => values.concat(resolvedPromises)));
            }
            values.push(state.value);
        }
        return new ValueOrPromise(() => values);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmFsdWVPclByb21pc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvVmFsdWVPclByb21pc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsU0FBUyxhQUFhLENBQUksTUFBZTtJQUN2QyxPQUFPLE1BQU0sSUFBSSxJQUFJLElBQUksT0FBUSxNQUFxQixDQUFDLElBQUksS0FBSyxVQUFVLENBQUM7QUFDN0UsQ0FBQztBQW1CRCxNQUFNLG1CQUFtQixHQUFHLENBQUMsTUFBZSxFQUFFLEVBQUU7SUFDOUMsTUFBTSxNQUFNLENBQUM7QUFDZixDQUFDLENBQUM7QUFFRixNQUFNLE9BQU8sY0FBYztJQUd6QixZQUFZLFFBQXFEO1FBQy9ELElBQUksS0FBNEMsQ0FBQztRQUVqRCxJQUFJO1lBQ0YsS0FBSyxHQUFHLFFBQVEsRUFBRSxDQUFDO1NBQ3BCO1FBQUMsT0FBTyxNQUFNLEVBQUU7WUFDZixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUM7WUFDbkQsT0FBTztTQUNSO1FBRUQsSUFBSSxhQUFhLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUM7WUFDMUMsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLENBQUM7SUFDOUMsQ0FBQztJQUVNLElBQUksQ0FDVCxXQUdRLEVBQ1IsVUFHUTtRQUVSLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFFekIsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUM5QixPQUFPLElBQUksY0FBYyxDQUFDLEdBQUcsRUFBRSxDQUM3QixLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFX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