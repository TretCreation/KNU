section .data
    turn1 db 0      ; Flag to indicate if process 1 is ready
    turn2 db 0      ; Flag to indicate if process 2 is ready
    flag1 db 0      ; Turn flag for process 1
    flag2 db 0      ; Turn flag for process 2
    message1 db "Process 1!", 10, 0   ; 10 is the newline character
    message2 db "Process 2!", 10, 0   ; 10 is the newline character

section .text
    global _start

_start:
    ; Initialize registers and flags
    mov rax, 1       ; Process 1
    mov rbx, 2       ; Process 2

    ; Start of process 1
    mov byte [flag1], 1   ; Set flag1 to indicate process 1 is ready
    mov byte [turn1], 1   ; Set turn1 to indicate it's process 1's turn

    jmp check

p1_section:
    ; Critical section for process 1
    mov rdx, 23         ; Length of the message for process 1 (including newline)
    mov rax, 1          ; syscall: write
    mov rdi, 1          ; file descriptor: STDOUT
    mov rsi, message1   ; pointer to the message
    syscall

    ; Start of process 2
    mov byte [flag1], 0   ; Reset flag1 to indicate process 1 is not ready
    jmp end

check:
    mov byte [flag2], 1   ; Set flag2 to indicate process 2 is ready
    mov byte [turn2], 1   ; Set turn2 to indicate it's process 2's turn

    jmp check2

p2_section:
    ; Critical section for process 2
    mov rdx, 23         ; Length of the message for process 2 (including newline)
    mov rax, 1          ; syscall: write
    mov rdi, 1          ; file descriptor: STDOUT
    mov rsi, message2   ; pointer to the message
    syscall

    mov byte [flag2], 0   ; Reset flag2 to indicate process 2 is not ready
    jmp end

check2:
    cmp byte [turn1], 1
    je p1_section

    cmp byte [turn2], 1
    je p2_section

end:
    ; End of the program
    mov rax, 60         ; syscall: exit
    xor rdi, rdi        ; status: 0
    syscall
