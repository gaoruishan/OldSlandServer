class A {
    constructor() {
        this.nameA = 'a'
    }
    validateA() {
        console.log("A")
    }
}

class B extends A {
    constructor() {
        super()
        this.nameB = 'b'
    }

    validateB() {
        console.log("B")
    }
}

class C extends B {
    constructor() {
        super()
        this.nameC = 'c'
    }

    validateC() {
        console.log("C")
    }
}

function findMembers(instance, fieldPrefix, funcPrefix) {

    // 递归函数
    function _find(instance) {
         //基线条件（跳出递归）
        if (instance.__proto__ === null)
            return []

        let names = Reflect.ownKeys(instance)
        names = names.filter((name)=>{
            // 过滤掉不满足条件的属性或方法名
            return _shouldKeep(name)
        })
        
        return [...names, ..._find(instance.__proto__)]
    }

    function _shouldKeep(value) {
        if (value.startsWith(fieldPrefix) || value.startsWith(funcPrefix))
            return true
    }

    return _find(instance)
}



var c = new C()

// 编写一个函数findMembers
console.log(c)//C { nameA: 'a', nameB: 'b', nameC: 'c' }
console.log(c.__proto__)//C {}

console.log(Reflect.ownKeys(c))//[ 'nameA', 'nameB', 'nameC' ]

console.log(Reflect.ownKeys(c.__proto__))//[ 'constructor', 'validateC' ]

const members = findMembers(c, 'name', 'validate')
console.log(members)//[ 'nameA', 'nameB', 'nameC', 'validateC', 'validateB', 'validateA' ]

// 原型链 查找 