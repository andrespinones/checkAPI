import { AbstractControl } from '@angular/forms';

export function ValidatePath(control: AbstractControl) {

    // Using ArrayDeque is faster
    // than using Stack class
    let stack = [];

    // Traversing the Expression
    for(let i = 0; i < control.value.length; i++)
    {
        let x = control.value[i];

        if (x == '(' || x == '[' || x == '{')
        {

            // Push the element in the stack
            stack.push(x);
            continue;
        }

        // If current character is not opening
        // bracket, then it must be closing.
        // So stack cannot be empty at this point.
        if (stack.length == 0)
            return {invalid: true};

        let check;
        switch (x){
        case ')':
            check = stack.pop();
            if (check == '{' || check == '[')
            return {invalid: true};
            break;

        case '}':
            check = stack.pop();
            if (check == '(' || check == '[')
            return {invalid: true};
            break;

        case ']':
            check = stack.pop();
            if (check == '(' || check == '{')
            return {invalid: true};
            break;
        }
    }

    // Check Empty Stack
    if (stack.length == 0){
      return null;
    }else{
      return {invalid: true}
    }
}
