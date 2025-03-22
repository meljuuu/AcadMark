<template>
    <div class="rounded-3xl" style="box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;">
        <div class="relative w-sm border-[1px] rounded-3xl overflow-hidden border-[#c0c0c0]">
            <div class="p-5 relative z-10">
                <p class="text-base font-medium" :class="cardColor.text">TVL-EIM</p>
                <p class="text-5xl font-medium" :class="cardColor.text">Einstein</p>
                <p class="italic text-lg font-regular" :class="cardColor.text">English</p>
                <p class="text-base font-light" :class="cardColor.text">Senior High Grade 12</p>
            </div>

            <!-- Image wrapper with opacity -->
            <div class="absolute top-0 right-0 w-full h-full overflow-hidden">
                <img class="opacity-50 h-50 absolute top-5 right-[-55px]" src="/assets/img/logo.png" alt="" />
            </div>

            <div class="rounded-b-3xl flex justify-between items-center p-5 relative z-10" :class="cardColor.bg">
                <p class="text-base font-semibold text-white">{{ cardTitle }}</p>
                <p class="text-light text-base text-white border-white border-[1px] py-2 px-7 rounded-xl">
                    Enter
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Card",
    props: {
        type: {
            type: String,
            required: true, // Must be passed as a prop
        },
    },
    computed: {
        cardColor() {
            return this.type === "Advisory"
                ? { text: "text-blue", bg: "bg-blue" }
                : { text: "text-green", bg: "bg-green" };
        },
        cardTitle() {
            return this.type === "Advisory" ? "Advisory Class" : "Subject Class";
        },
    },
};
</script>
