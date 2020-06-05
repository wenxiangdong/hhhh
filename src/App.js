import React, {
  useContext,
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";

const data = Array(20)
  .fill("")
  .map((_, index) => index);

/**
 * 路径动画
 * 使用FLIP技术实现
 * @param {React.MutableRefObject<HTMLElement>} ref
 * @param {{
 * duration?: Number,
 * customerBeginAnimations?: AnimationKeyFrame[]
 * }} [options]
 */
const useFLIP = (ref, { duration = 300, customerBeginAnimations } = {}) => {
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const firstTimeRef = useRef(true);

  useEffect(() => {
    const { left, top } = ref.current.getBoundingClientRect();
    setPosition({ left, top });
  }, []);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const { left, top } = ref.current.getBoundingClientRect();
    const { left: prevLeft, top: prevTop } = position;
    const invert = {
      left: prevLeft - left,
      top: prevTop - top,
    };
    if (invert.left === 0 && invert.top === 0) return;

    let keyframes = [
      {
        transform: `translate(${invert.left}px, ${invert.top}px)`,
      },
      {
        transform: "translate(0, 0)",
      },
    ];
    // 首次动画处理，即刚出现
    if (firstTimeRef.current) {
      keyframes = customerBeginAnimations || keyframes;
      firstTimeRef.current = false;
    }

    const animation = ref.current.animate(keyframes, {
      duration,
      easing: "cubic-bezier(0,0,0.32,1)",
    });
    animation.onfinish = () => {
      setPosition({ left, top });
    };
    return () => {
      if (!animation.finished) {
        animation.cancel();
      }
    };
  });
};
const Item = ({ value, onClick }) => {
  const ref = useRef();
  useFLIP(ref, {
    duration: TIME,
    customerBeginAnimations: [
      {
        opacity: 0,
        transform: "scale(0)",
      },
      {
        opacity: 1.0,
        transform: "scale(1)",
      },
    ],
  });
  return (
    <div
      ref={ref}
      onClick={onClick}
      style={{
        width: 50,
        height: 50,
        textAlign: "center",
        background: "tomato",
        margin: 8,
      }}
    >
      {value}
    </div>
  );
};

const throttle = (fn, time = 300) => {
  let last = 0;
  return function () {
    const now = Date.now();
    if (now - last > time) {
      fn.apply(null, arguments);
      last = now;
    }
  };
};

const debounce = (fn, time = 300) => {
  let timer = null;
  return function () {
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(null, args);
    }, time);
  };
};

const shuffle = (list = []) => {
  const result = Array.from(list);
  for (let i = result.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * i);
    const removed = result.splice(r, 1, result[i]);
    result[i] = removed;
  }
  return result;
};

const TIME = 300;

function App() {
  const [items, setItems] = useState(() =>
    Array(20)
      .fill("")
      .map((_, index) => index)
  );
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "70%",
          border: "1px gray solid",
          overflow: "hidden",
        }}
      >
        {items.map((item, index) => (
          <Item
            key={item}
            value={item}
            onClick={() => {
              setItems((preItems) => {
                preItems.splice(index, 1);
                return [...preItems];
              });
            }}
          />
        ))}
      </div>
      <button
        onClick={() => {
          setItems((preItems) => {
            const added = Array(5)
              .fill(0)
              .map(() => Math.random().toString(32).slice(-4));
            return [...added, ...preItems];
          });
        }}
      >
        add
      </button>
      <button
        onClick={debounce(() => {
          setItems((prev) => shuffle(prev));
        }, TIME)}
      >
        shuffle
      </button>
    </div>
  );
}
export default App;
