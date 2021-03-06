import { Popover } from "@headlessui/react";

import clsx from "clsx";
import { useEffect } from "react";
import { HiChevronDown, HiChevronUp, HiX, MdRestartAlt, RiTimerFlashFill } from "react-icons/all";

import { AnimationWrapper, animations, RealButton, RealIconButton } from "components";
import { useTimer } from "context";

export const TimerPopover = () => {
  const {
    seconds,
    minutes,
    started,
    isComplete,
    isDisabled,
    setIsComplete,
    setIsDisabled,
    setMinutes,
    setSeconds,
    setStarted,
  } = useTimer();

  useEffect(() => {
    if (seconds === 0 && minutes === 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }

    const interval = setInterval(() => {
      // when countdown is going on
      if (started) {
        // when timer is complete stop the interval (so 0 and 0) otherwise count down
        if (seconds === 0 && minutes === 0) {
          setIsComplete(true);
          setStarted(false);
        } else {
          // when seconds are 0 and there is atleast 1 minute left
          // count down one minute and set seconds to 59
          if (seconds === 0 && minutes > 0) {
            setMinutes(minutes => minutes - 1);
            setSeconds(60);
          }
          // count down one second
          setSeconds(seconds => seconds - 1);
        }
      }
    }, 1000);
    return () => clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, seconds, minutes]);

  // @todo some effects here
  console.log("isComplete", isComplete);

  return (
    <Popover>
      <Popover.Button>
        <AnimationWrapper
          variants={animations.smallScale}
          animateOnAllScreens
          keyIndex="nb-chart-icon"
        >
          <RiTimerFlashFill className="w-14 h-14 cursor-pointer fill-slate-700 hover:fill-slate-800" />
        </AnimationWrapper>
      </Popover.Button>
      <Popover.Panel
        className={clsx(
          "absolute left-1/2 z-10 min-w-[12rem] max-w-[12rem] transform -translate-x-1/2 select-none sm:px-0",
          started ? "-translate-y-60" : "-translate-y-[19rem]"
        )}
      >
        {({ close }) => (
          <div className="overflow-hidden rounded-lg shadow-lg">
            <div className="flex relative flex-col p-3 text-2xl font-bold bg-white">
              <div className="flex justify-end items-end text-right">
                <AnimationWrapper
                  keyIndex="timer-header-x-icon"
                  variants={animations.rotate360}
                  className="cursor-pointer"
                >
                  <HiX
                    className="w-6 h-6 fill-slate-700 hover:fill-slate-800"
                    onClick={() => close()}
                  />
                </AnimationWrapper>
              </div>
              <div className="flex flex-row justify-center items-center mb-2 text-4xl">
                {started ? (
                  <>
                    <div className="flex flex-col justify-center items-center min-w-[2.5rem] max-w-[2.5rem]">
                      <p className="">
                        {minutes < 10 && "0"}
                        {minutes}
                      </p>
                    </div>
                    <p className="mx-2">:</p>
                    <div className="flex flex-col justify-center items-center min-w-[2.5rem] max-w-[2.5rem]">
                      <p className="">
                        {seconds < 10 && "0"}
                        {seconds}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col justify-center items-center min-w-[2.5rem] max-w-[2.5rem]">
                      <AnimationWrapper
                        className="cursor-pointer"
                        keyIndex="timer-popover-scale"
                        variants={animations.smallScale}
                      >
                        <HiChevronUp
                          onClick={() =>
                            setMinutes(state => {
                              if (state + 1 >= 21) {
                                return 0;
                              } else {
                                return state + 1;
                              }
                            })
                          }
                        />
                      </AnimationWrapper>
                      <p className="">
                        {minutes < 10 && "0"}
                        {minutes}
                      </p>
                      <AnimationWrapper
                        className="cursor-pointer"
                        keyIndex="timer-popover-scale"
                        variants={animations.smallScale}
                      >
                        <HiChevronDown
                          onClick={() =>
                            setMinutes(state => {
                              if (state - 1 <= -1 || state - 1 < 0) {
                                return 20;
                              } else {
                                return state - 1;
                              }
                            })
                          }
                        />
                      </AnimationWrapper>
                    </div>
                    <p className="mx-2">:</p>
                    <div className="flex flex-col justify-center items-center min-w-[2.5rem] max-w-[2.5rem]">
                      <AnimationWrapper
                        className="cursor-pointer"
                        keyIndex="timer-popover-scale"
                        variants={animations.smallScale}
                      >
                        <HiChevronUp
                          onClick={() =>
                            setSeconds(state => {
                              if (state + 5 >= 60) {
                                return 0;
                              } else {
                                return state + 5;
                              }
                            })
                          }
                        />
                      </AnimationWrapper>
                      <p className="">
                        {seconds < 10 && "0"}
                        {seconds}
                      </p>
                      <AnimationWrapper
                        className="cursor-pointer"
                        keyIndex="timer-popover-scale"
                        variants={animations.smallScale}
                      >
                        <HiChevronDown
                          onClick={() =>
                            setSeconds(state => {
                              if (state - 5 <= -5 || state - 5 < 0) {
                                return 55;
                              } else {
                                return state - 5;
                              }
                            })
                          }
                        />
                      </AnimationWrapper>
                    </div>
                  </>
                )}
              </div>
              <div className="flex flex-row justify-between items-center">
                <RealIconButton size="xs" className="opacity-0 cursor-default">
                  <MdRestartAlt />
                </RealIconButton>
                <RealButton
                  onClick={() => setStarted(state => !state)}
                  size="xs"
                  disabled={isDisabled}
                  className={clsx(
                    isDisabled ? "cursor-not-allowed" : "cursor-pointer",
                    "mr-2 text-base"
                  )}
                >
                  {started ? "Stop" : "Start"}
                </RealButton>
                <RealIconButton
                  size="sm"
                  className="rounded-full"
                  onClick={() => {
                    setMinutes(0);
                    setSeconds(0);
                    setStarted(false);
                    setIsComplete(false);
                  }}
                >
                  <MdRestartAlt />
                </RealIconButton>
              </div>
            </div>
          </div>
        )}
      </Popover.Panel>
    </Popover>
  );
};
