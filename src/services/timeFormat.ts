import { ref } from 'vue'

export function getTimeFormat(timeStr: string): string {
    const timeDate: Date = new Date(timeStr);
    const correctTime = ref('');
    const hour: number = timeDate.getHours();
    if (hour >= 0 && hour <=9) {
        correctTime.value += '0';
    }
    correctTime.value += hour + ':';
    const minute: number = timeDate.getMinutes();
    if (minute >= 0 && minute <=9) {
        correctTime.value += '0';
    }
    correctTime.value += minute + ':';
    const second: number = timeDate.getSeconds();
    if (second >= 0 && second <=9) {
        correctTime.value += '0';
    }
    correctTime.value += second;
    return correctTime.value;
}